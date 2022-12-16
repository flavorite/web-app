import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './NavBar'

describe('NavBar', () => {
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
  })

  test('if user, hide Login & Register options, and display User options', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <NavBar />
        </Router>
      </QueryClientProvider>,
    )

    // user options menu button displayed
    const userOptionsBtn = screen.getByLabelText('user options')
    expect(userOptionsBtn).toBeVisible()

    // login & register buttons hidden
    const LoggedoutMenuXs = screen.getByLabelText('loggedOutMenu xs')
    const LoggedoutMenuMd = screen.getByLabelText('loggedOutMenu md')

    expect(LoggedoutMenuXs).not.toBeVisible()
    expect(LoggedoutMenuMd).not.toBeVisible()
  })

  test('if no user, display Login & Register options, and hide User options', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <NavBar />
        </Router>
      </QueryClientProvider>,
    )

    // user options menu button hidden
    const userOptionsBtn = screen.getByLabelText('user options')
    expect(userOptionsBtn).not.toBeVisible()

    // login & register buttons displayed
    const LoggedoutMenuXs = screen.getByLabelText('loggedOutMenu xs')
    const LoggedoutMenuMd = screen.getByLabelText('loggedOutMenu md')

    expect(LoggedoutMenuXs).toBeVisible()
    expect(LoggedoutMenuMd).toBeVisible()
  })
})
