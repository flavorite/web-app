import { render, screen } from '@testing-library/react'
import { verticalDrag } from 'react-beautiful-dnd-tester'
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

describe('FavoriteFoods', () => {
  test('should render without crashing and displays a list of favorite foods from fetched data', async () => {
    render(
      <TestProvider>
        <FavoriteFoods />
      </TestProvider>,
    )
    screen.debug()
  })

  test('drags an item in front of another', async () => {
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

    let first = await screen.getAllByTestId(/item/i)[0]
    const second = await screen.getAllByTestId(/item/i)[1]

    verticalDrag(second).inFrontOf(first)
    first = screen.getAllByTestId(/item/i)[0]
    expect(first.textContent).toBe(second.textContent)

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
