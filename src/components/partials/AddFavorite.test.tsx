import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddFavorite from './AddFavorite'
import TestProvider from './TestProvider'

const mockAddFavorites = jest.fn()

jest.mock('../../hooks/useUpdateFavorites', () => {
  return () => {
    return {
      mutate: mockAddFavorites,
      loading: false,
      error: 'There is an error in adding new favorite food',
      success: true,
    }
  }
})

describe('AddFavorite', () => {
  test('renders AddFavorite textfield without crashing', () => {
    render(
      <TestProvider>
        <AddFavorite
          username='kitty'
          favorites={[
            { id: 1, name: 'sushi' },
            { id: 2, name: 'pizza' },
          ]}
        />
      </TestProvider>,
    )
    const addFavoriteField = screen.getByRole('textbox', { name: /Add a new Favorite Dish/i })
    const addFavoriteBtn = screen.getByRole('button', { name: /add/i })
    expect(addFavoriteField).toBeInTheDocument()
    expect(addFavoriteBtn).toBeInTheDocument()
  })

  test('textField should be required, and user can type', async () => {
    render(
      <TestProvider>
        <AddFavorite
          username='kitty'
          favorites={[
            { id: 1, name: 'sushi' },
            { id: 2, name: 'pizza' },
          ]}
        />
      </TestProvider>,
    )
    const addFavoriteField = screen.getByRole('textbox', { name: /Add a new Favorite Dish/i })
    expect(addFavoriteField).toBeRequired()
    await userEvent.type(addFavoriteField, 'tacos')
    expect(addFavoriteField).toHaveValue('tacos')
  })

  test('onSubmit, should post form data to update FavoriteFoods and clear textField', async () => {
    render(
      <TestProvider>
        <AddFavorite
          username='kitty'
          favorites={[
            { id: 1, name: 'sushi' },
            { id: 2, name: 'pizza' },
          ]}
        />
      </TestProvider>,
    )
    const addFavoriteField = screen.getByRole('textbox', {
      name: /Add a new Favorite Dish/i,
    }) as HTMLInputElement
    await userEvent.type(addFavoriteField, 'tacos')

    const addFavoriteBtn = screen.getByRole('button', { name: /add/i })
    await userEvent.click(addFavoriteBtn)

    expect(mockAddFavorites).toBeCalledWith({
      username: 'kitty',
      listFavoriteFoods: {
        favoriteFoods: [
          { id: 1, name: 'sushi' },
          { id: 2, name: 'pizza' },
          { id: 3, name: 'tacos' },
        ],
      },
    })

    await waitFor(() => {
      expect(addFavoriteField.value).toBe('')
    })
  })

  test('if updateFavorites has error, should display error message', () => {
    render(
      <TestProvider>
        <AddFavorite
          username='kitty'
          favorites={[
            { id: 1, name: 'sushi' },
            { id: 2, name: 'pizza' },
          ]}
        />
      </TestProvider>,
    )

    const errorMsg = screen.getByRole('error-message')
    expect(errorMsg).toHaveTextContent('There is an error in adding new favorite food')
  })
})
