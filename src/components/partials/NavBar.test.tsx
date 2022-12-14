import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './NavBar'

describe('NavBar', () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
  Object.setPrototypeOf(window.localStorage.getItem, jest.fn())
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn())
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'clear')
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn())

  beforeEach(() => {
    window.localStorage.clear()
  })

  test('renders navbar without crashing', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <NavBar />
        </Router>
      </QueryClientProvider>,
    )
    const navBar = screen.getByRole('banner')
    expect(navBar).toBeInTheDocument()

    expect(window.localStorage.getItem).toHaveBeenCalledWith('token')
  })

  test('if user, hide Login & Register options, and display User options', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <NavBar />
        </Router>
      </QueryClientProvider>,
    )

    // set user
    window.localStorage.setItem('token', 'tokenString')

    // user options menu button displayed
    const userOptionsBtn = screen.getByRole('button', { name: 'Open settings' })
    expect(userOptionsBtn).toBeVisible()

    // login & register buttons hidden
    const loggedOutOptions = screen.getByLabelText('loggedOutMenu')

    expect(loggedOutOptions).not.toBeVisible()
  })

  test('if no user, display Login & Register options, and hide User options', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <NavBar />
        </Router>
      </QueryClientProvider>,
    )

    // set user to null
    window.localStorage.clear()

    // user options menu button is hidden
    const userOptionsBtn = screen.getByRole('button', { name: 'Open settings' })
    expect(userOptionsBtn).not.toBeVisible()

    // login & register buttons displayed
    const loggedOutOptions = screen.getByLabelText('loggedOutMenu')

    expect(loggedOutOptions).toBeVisible()
  })
})
