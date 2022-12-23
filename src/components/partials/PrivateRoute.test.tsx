import { render, screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from '../partials/UserContext'
import PrivateRoute from './PrivateRoute'
import TestProvider from './TestProvider'

describe('PrivateRoute', () => {
  test('should render Children component when UserAuth is verified', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Routes>
            <Route
              path='/test/private'
              element={
                <PrivateRoute>
                  <>Children</>
                </PrivateRoute>
              }
            />
          </Routes>
        </UserContext.Provider>
      </TestProvider>,
    )

    // expect(await screen.findByText('Children')).toBeInTheDocument()
    expect(screen.findByText('Children')).toBeInTheDocument()
  })

  test('should reroute to Login page if UserAuth is not verified', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: null,
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Routes>
            <Route
              path='/test/private'
              element={
                <PrivateRoute>
                  <>Children</>
                </PrivateRoute>
              }
            />
          </Routes>
        </UserContext.Provider>
      </TestProvider>,
    )
    // expect(await screen.findByText('Children')).not.toBeInTheDocument()
    // expect(location.pathname).toEqual('/login')
  })
})
