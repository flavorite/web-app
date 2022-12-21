import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TestProvider from '../partials/TestProvider'
import FavoriteFoods from './FavoriteFoods'

jest.mock('../../hooks/useUser', () => {
  return () => {
    return {
      loading: false,
      error: null,
      user: {
        id: 1,
        username: 'kitty',
        email: 'v@b.com',
        firstName: 'valerie',
        lastName: 'yang',
        password: 'testpw',
        favoriteFoods: [
          { order: 1, name: 'sushi' },
          { order: 2, name: 'pizza' },
        ],
        friends: [],
      },
    }
  }
})

describe('FavoriteFoods', () => {
  test('renders AddFavorite textfield without crashing', () => {
    render(
      <TestProvider>
        <FavoriteFoods />
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
        <FavoriteFoods />
      </TestProvider>,
    )
    const addFavoriteField = screen.getByRole('textbox', { name: /Add a new Favorite Dish/i })
    expect(addFavoriteField).toBeRequired()
    await userEvent.type(addFavoriteField, 'tacos')
    expect(addFavoriteField).toHaveValue('tacos')
  })

  test('onSubmit, should post form data to update FavoriteFoods', async () => {
    render(
      <TestProvider>
        <FavoriteFoods />
      </TestProvider>,
    )
    const addFavoriteField = screen.getByRole('textbox', {
      name: /Add a new Favorite Dish/i,
    }) as HTMLInputElement
    fireEvent.change(addFavoriteField, { target: { value: 'tacos' } })

    const addFavoriteBtn = screen.getByRole('button', { name: /add/i })
    await userEvent.click(addFavoriteBtn)
  })

  test('if updateFavorites has error, should display error message', () => {
    render(
      <TestProvider>
        <FavoriteFoods />
      </TestProvider>,
    )

    const errorMsg = screen.getByRole('error-message')
    expect(errorMsg).toHaveTextContent('There is an error in adding new favorite food')
  })
})
