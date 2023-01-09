import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TestProvider from '../partials/TestProvider'
import { UserContext } from '../partials/UserContext'
import Profile from './Profile'

jest.mock('../../hooks/useUser', () => {
  return () => {
    return {
      loading: false,
      error: 'there is an error in fetching user',
      success: true,
      user: {
        id: '1',
        username: 'kitty',
        email: 'v@b.com',
        firstName: 'valerie',
        lastName: 'yang',
        password: 'testpw',
      },
    }
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    username: 'kitty',
  }),
}))

describe('Profile', () => {
  test('renders without crashing and displays edit button for Profile if currentUser matches Profile user', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Profile />
        </UserContext.Provider>
      </TestProvider>,
    )
    const profileUserame = screen.getByRole('profile-name')
    expect(profileUserame).toBeInTheDocument()
    expect(profileUserame.textContent).toBe('@kitty')

    expect(screen.getByLabelText('view-friends')).toBeInTheDocument()
    expect(screen.getByLabelText('view-favorites')).toBeInTheDocument()
    expect(screen.getByLabelText('view-reviews')).toBeInTheDocument()
    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(5)

    expect(screen.getByRole('button', { name: 'editprofile-button' })).toBeInTheDocument()
  })

  test('should not display edit button for Profile if currentUser does not Profile user', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'otherUser', token: 'otherUserToken' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Profile />
        </UserContext.Provider>
      </TestProvider>,
    )
    expect(screen.queryByRole('button', { name: 'editprofile-button' })).not.toBeInTheDocument
  })

  test('View Friends button should direct to Friends route', async () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Profile />
        </UserContext.Provider>
      </TestProvider>,
    )
    await userEvent.click(screen.getByLabelText('view-friends'))
    expect(location.pathname).toEqual('/kitty/friends')
  })

  test('Favorite Dishes button should direct to FavoriteFoods page', async () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Profile />
        </UserContext.Provider>
      </TestProvider>,
    )

    await userEvent.click(screen.getByLabelText('view-favorites'))
    expect(location.pathname).toEqual('/kitty/favorites')
  })

  test('View All Reviews button should direct UserReviews page', async () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Profile />
        </UserContext.Provider>
      </TestProvider>,
    )

    await userEvent.click(screen.getByLabelText('view-reviews'))
    expect(location.pathname).toEqual('/kitty/reviews')
  })

  test('displays error message if error in fetching user data', () => {
    render(
      <TestProvider>
        <Profile />
      </TestProvider>,
    )

    expect(screen.getByRole('error-message-userData')).toHaveTextContent(
      'there is an error in fetching user',
    )
  })
})
