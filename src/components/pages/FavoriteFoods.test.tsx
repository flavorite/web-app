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
  test('if currentUser matches profileUser, should display addFavorite component and draggable list of favoriteFoods. On mouse hover on list item, should show View Review button and Delete button', async () => {
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

    const addFavoriteField = screen.getByRole('textbox', { name: /Add a new Favorite Dish/i })
    const addFavoriteBtn = screen.getByRole('button', { name: /add/i })
    const draggableList = screen.findByLabelText(/favorites-list-draggable/i)
    const firstListItem = screen.findByLabelText('item0')

    expect(addFavoriteField).toBeInTheDocument()
    expect(addFavoriteBtn).toBeInTheDocument()
    expect(await draggableList).toBeInTheDocument()
    expect(screen.queryByLabelText('viewReview-0')).not.toBeVisible()
    expect(screen.queryByLabelText('delete-0')).not.toBeVisible()

    await fireEvent.mouseEnter(await firstListItem)

    expect(await screen.findByLabelText('viewReview-0')).toBeVisible()
    expect(await screen.findByLabelText('delete-0')).toBeVisible()
  })

  test('if currentUser matches profileUser, user should be able to drag and drop favorites to update favorites list to new order', async () => {
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

    // Library preset label for draggable list item
    const first = screen.getByLabelText('0')

    first.focus()
    expect(first).toHaveFocus()

    await fireEvent.keyDown(first, { key: ' ', keyCode: 32 })

    await fireEvent.keyDown(first, { key: 'ArrowDown', keyCode: 40 })

    await fireEvent.keyDown(first, { key: ' ', keyCode: 32 })

    expect(mockUpdateFoods).toBeCalledWith({
      username: 'kitty',
      listFavoriteFoods: {
        favoriteFoods: [
          { id: 1, name: 'pizza' },
          { id: 2, name: 'sushi' },
        ],
      },
    })
  })

  test('if currentUser does not match profileUser, should only display non-draggable list of favoritefoods. On mouseHover on list item, should display View Reviews button', async () => {
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

    expect(screen.queryByLabelText('viewReview-0')).not.toBeVisible()

    const firstListItem = screen.findByLabelText('item0')
    await fireEvent.mouseEnter(await firstListItem)

    expect(await screen.findByLabelText('viewReview-0')).toBeVisible()
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
