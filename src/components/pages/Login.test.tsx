import { render, screen } from '@testing-library/react'
import Login from './Login'

describe('Login', () => {
  // test the page renders login form without crashing
  test('renders login form', () => {
    render(<Login />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  // Test input validation on form (all fields should be required)
  test('all fields are required in form', () => {
    render(<Login />)
    expect(screen.getByTestId('required-usernameOrEmail')).toBeRequired()
    expect(screen.getByTestId('required-password')).toBeRequired()
  })

  // TODO need to figure out handling login with backend
  // TODO Loading state on form submission from React-query

  // TODO Test success case from React-query

  // TODO Test error case from React-query
})
