import { fireEvent, render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import { verticalDrag } from 'react-beautiful-dnd-tester'
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
      ],
    }
  }
})

jest.mock('@hello-pangea/dnd', () => ({
  Droppable: ({ children }: any) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {},
    ),
  Draggable: ({ children }: any) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {},
    ),
  DragDropContext: ({ children }: any) => children,
}))

describe('FavoriteFoods', () => {
  test('should render without crashing and displays addFavorite component and a list of favorite foods from fetched data', async () => {
    render(
      <TestProvider>
        <FavoriteFoods />
      </TestProvider>,
    )
    const addFavoriteField = screen.getByRole('textbox', { name: /Add a new Favorite Dish/i })
    const addFavoriteBtn = screen.getByRole('button', { name: /add/i })
    expect(addFavoriteField).toBeInTheDocument()
    expect(addFavoriteBtn).toBeInTheDocument()
    expect(screen.getByLabelText(/favorites-list/i)).toBeInTheDocument()
  })

  test('drags an item in front of another', async () => {
    const { getAllByTestId } = render(
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
    // screen.debug()
    const first = getAllByTestId(/item/i)[0]
    const second = getAllByTestId(/item/i)[1]

    const SPACE = { key: ' ', code: 'Space' }
    const ARROW_DOWN = { key: 'ArrowDown', code: 'ArrowDown' }
    fireEvent.keyDown(first, SPACE) // Begins the dnd
    fireEvent.keyDown(first, ARROW_DOWN) // Moves the element
    fireEvent.keyDown(first, SPACE) // Ends the dnd

    // verticalDrag(second).inFrontOf(first)
    // const newSecond = await screen.findByText('2.sushi')

    // expect(newFirst).toBeInTheDocument()
    // expect(newSecond).toBeInTheDocument()

    // expect(mockUpdateFoods).toBeCalledWith({
    //   username: 'kitty',
    //   listFavoriteFoods: {
    //     favoriteFoods: [
    //       { id: 1, name: 'pizza' },
    //       { id: 2, name: 'sushi' },
    //     ],
    //   },
    // })
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
