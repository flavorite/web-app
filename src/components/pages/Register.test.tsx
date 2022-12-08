import { render, screen } from '@testing-library/react'
import Register from './Register'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import userEvent from '@testing-library/user-event'

describe('Register component', () => {
  // test the page renders login form without crashing
  test('renders register form', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <Register />
        </Router>
      </QueryClientProvider>,
    )
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  // Test input validation on form (all fields should be required)
  test('all fields are required in form', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <Register />
        </Router>
      </QueryClientProvider>,
    )
    expect(screen.getByTestId('required-firstName')).toBeRequired()
    expect(screen.getByTestId('required-lastName')).toBeRequired()
    expect(screen.getByTestId('required-email')).toBeRequired()
    expect(screen.getByTestId('required-username')).toBeRequired()
    expect(screen.getByTestId('required-password')).toBeRequired()
  })

  // TODO Test Loading State on submission with React-Query

  // TODO Test success case with React-Query

  // TODO Test error case with React-Query
})
