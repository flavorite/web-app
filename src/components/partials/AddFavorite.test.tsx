import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import AddFavorite from './AddFavorite'

describe('AddFavorite', () => {
  test('renders AddFavorite textfield without crashing', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <AddFavorite />
        </Router>
      </QueryClientProvider>,
    )
    const addFavoriteField = screen.getByRole('textbox', { name: /Add a new Favorite Dish/i })
    const addFavoriteBtn = screen.getByRole('button', { name: /add/i })
    expect(addFavoriteField).toBeInTheDocument()
    expect(addFavoriteBtn).toBeInTheDocument()
  })
})
