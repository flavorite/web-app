import { render, screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from '../partials/UserContext'
import PrivateRoute from './PrivateRoute'
import TestProvider from './TestProvider'

describe('PrivateRoute', () => {
  const MockOutlet = () => <>Mock Outlet Component</>

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
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<MockOutlet />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </TestProvider>,
    )

    expect(screen.getByText('Mock Outlet Component')).toBeInTheDocument()
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
          <PrivateRoute />
        </UserContext.Provider>
      </TestProvider>,
    )

    expect(location.pathname).toEqual('/login')
  })
})
