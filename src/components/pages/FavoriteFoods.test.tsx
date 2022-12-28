import { fireEvent, render, screen } from '@testing-library/react'
import TestProvider from '../partials/TestProvider'
import { UserContext } from '../partials/UserContext'
import FavoriteFoods from './FavoriteFoods'

const mockUpdateFoods = jest.fn()

jest.mock('../../hooks/useFavorites', () => {
  return () => {
    return {
      loading: false,
      error: 'there is an error in fetching favorites',
      success: true,
      favorites: [
        { id: 1, name: 'sushi' },
        { id: 2, name: 'pizza' },
        { id: 3, name: 'taco' },
      ],
    }
  }
})

jest.mock('../../hooks/useUpdateFavorites', () => {
  return () => {
    return {
      mutate: mockUpdateFoods,
      loading: false,
      error: 'there is an error in updating favorite foods',
      success: true,
      favorites: [
        { id: 1, name: 'sushi' },
        { id: 2, name: 'pizza' },
        { id: 3, name: 'taco' },
      ],
    }
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    username: 'kitty',
  }),
}))

// jest.mock('@hello-pangea/dnd', () => ({
//   Droppable: ({ children }: any) =>
//     children(
//       {
//         draggableProps: {
//           style: {},
//         },
//         innerRef: jest.fn(),
//       },
//       {},
//     ),
//   Draggable: ({ children }: any) =>
//     children(
//       {
//         draggableProps: {
//           style: {},
//         },
//         innerRef: jest.fn(),
//       },
//       {},
//     ),
//   DragDropContext: ({ children }: any) => children,
// }))

describe('FavoriteFoods', () => {
  test('if currentUser matches profileUser, should display addFavorite component draggable list of favoriteFoods', async () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <FavoriteFoods />
        </UserContext.Provider>
      </TestProvider>,
    )

    expect(await screen.findByLabelText(/favorites-list-draggable/i)).toBeInTheDocument()
    const addFavoriteField = screen.getByRole('textbox', { name: /Add a new Favorite Dish/i })
    const addFavoriteBtn = screen.getByRole('button', { name: /add/i })
    expect(addFavoriteField).toBeInTheDocument()
    expect(addFavoriteBtn).toBeInTheDocument()
  })

  test('if currentUser matches profileUser, user should be able to drag and drop favorites to change order', async () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <FavoriteFoods />
        </UserContext.Provider>
      </TestProvider>,
    )

    const sushi = screen.getByTestId('item0')
    const pizza = screen.getByTestId('item1')

    const SPACE = { key: ' ', code: 'Space', charCode: 32 }
    const ARROW_DOWN = { key: 'ArrowDown', code: 'ArrowDown', charCode: 40 }

    sushi.focus()
    expect(sushi).toHaveFocus()
    await fireEvent.keyDown(sushi, SPACE)
    await fireEvent.keyDown(sushi, ARROW_DOWN)
    await fireEvent.keyDown(sushi, ARROW_DOWN)
    await fireEvent.keyDown(sushi, SPACE)
    // verticalDrag(sushi).inFrontOf(taco)
    // screen.debug()

    expect(mockUpdateFoods).toBeCalled()
  })

  test('if currentUser does not match profileUser, should only display non-draggable list of favoritefoods', async () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'otherUser', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <FavoriteFoods />
        </UserContext.Provider>
      </TestProvider>,
    )
    const addFavoriteField = screen.queryByRole('textbox', { name: /Add a new Favorite Dish/i })
    const addFavoriteBtn = screen.queryByRole('button', { name: /add/i })
    expect(addFavoriteField).not.toBeInTheDocument()
    expect(addFavoriteBtn).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/favorites-list-draggable/i)).not.toBeInTheDocument()

    expect(await screen.findByLabelText(/favorites-otheruser/i)).toBeInTheDocument()
  })

  test('if error in fetching favorites or updating favoriteFoods, should display error message', () => {
    render(
      <TestProvider>
        <FavoriteFoods />
      </TestProvider>,
    )

    const errorMsgUserFavs = screen.getByRole('error-message-userFavs')
    expect(errorMsgUserFavs).toHaveTextContent('there is an error in fetching favorites')

    const errorMsgUpdateFavs = screen.getByRole('error-message-updateFavs')
    expect(errorMsgUpdateFavs).toHaveTextContent('there is an error in updating favorite foods')
  })
})
