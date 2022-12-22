import { render, screen } from '@testing-library/react'
import TestProvider from '../partials/TestProvider'
import FavoriteFoods from './FavoriteFoods'

const mockUpdateFoods = jest.fn()

const mockContextData = {
  username: 'kitty',
}
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => mockContextData,
}))

jest.mock('../../hooks/useFavorites', () => {
  return () => {
    return {
      loading: false,
      error: 'there is an error in fetching favorites',
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
  test('renders without crashing and displays a list of favorite foods from user data', () => {
    render(
      <TestProvider>
        <FavoriteFoods />
      </TestProvider>,
    )
    const draggableList = screen.getByLabelText('DraggableList-favorites')
    expect(draggableList).toBeInTheDocument()
  })

  test('drag and drop of list items should update and display a new ordered list', async () => {
    render(
      <TestProvider>
        <FavoriteFoods />
      </TestProvider>,
    )
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
