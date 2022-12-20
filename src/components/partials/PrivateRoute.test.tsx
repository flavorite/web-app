import { render, screen } from '@testing-library/react'
import { UserContext } from '../partials/UserContext'
import PrivateRoute from './PrivateRoute'
import TestProvider from './TestProvider'

describe('PrivateRoute', () => {
  test('should render Children component when UserAuth is verified', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            user: { username: 'kitty', auth: true },
            login: jest.fn(),
            logout: jest.fn(),
          }}
        >
          <PrivateRoute>
            <>Children</>
          </PrivateRoute>
        </UserContext.Provider>
      </TestProvider>,
    )

    expect(screen.getByText('Children')).toBeInTheDocument()
  })

  test('should reroute to Login page if UserAuth is not verified', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            user: { username: '', auth: false },
            login: jest.fn(),
            logout: jest.fn(),
          }}
        >
          <PrivateRoute>
            <>Children</>
          </PrivateRoute>
        </UserContext.Provider>
      </TestProvider>,
    )
    expect(screen.getByText('Children')).not.toBeInTheDocument()
    expect(location.pathname).toEqual('/login')
  })
})
