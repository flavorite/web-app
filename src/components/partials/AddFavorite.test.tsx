import { render, screen } from '@testing-library/react'
import AddFavorite from './AddFavorite'
import TestProvider from './TestProvider'

describe('AddFavorite', () => {
  test('renders AddFavorite textfield without crashing', () => {
    render(
      <TestProvider>
        <AddFavorite />
      </TestProvider>,
    )
    const addFavoriteField = screen.getByRole('textbox', { name: /Add a new Favorite Dish/i })
    const addFavoriteBtn = screen.getByRole('button', { name: /add/i })
    expect(addFavoriteField).toBeInTheDocument()
    expect(addFavoriteBtn).toBeInTheDocument()
  })
})
