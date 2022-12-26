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

jest.mock('react-beautiful-dnd', () => ({
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
  test('should render without crashing and displays a list of favorite foods from fetched data', async () => {
    render(
      <TestProvider>
        <FavoriteFoods />
      </TestProvider>,
    )
    expect(await screen.findByText('sushi')).toBeInTheDocument()
    expect(await screen.findByText('pizza')).toBeInTheDocument()
  })

  test('drag and drop of list items should update and display a new ordered list', async () => {
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

    // TODO test react-beautiful-dnd drag/drop functionality and updateFavorites result
    const sushi = await screen.findByText('sushi')
    const SPACE = { keyCode: 40 }
    const ARROW_DOWN = { keyCode: 32 }
    fireEvent.keyDown(sushi, SPACE) // Begins the drag
    fireEvent.keyDown(sushi, ARROW_DOWN) // Moves the element
    fireEvent.keyDown(sushi, SPACE) // Ends drag and drop

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

    const errorMsgUserData = screen.getByRole('error-message-userData')
    expect(errorMsgUserData).toHaveTextContent('there is an error in fetching favorites')

    const errorMsgUpdateFavs = screen.getByRole('error-message-updateFavs')
    expect(errorMsgUpdateFavs).toHaveTextContent('there is an error in updating favorite foods')
  })
})
