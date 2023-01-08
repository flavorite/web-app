import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TestProvider from '../partials/TestProvider'
import { UserContext } from '../partials/UserContext'
import Friends from './Friends'

const mockUpdateFriends = jest.fn()
const mockDeleteFriends = jest.fn()
let mockStatus = false

jest.mock('../../hooks/useFriends', () => {
  return () => {
    return {
      loading: false,
      error: 'There is an error in fetching friends',
      success: true,
      friends: [],
      fbConnected: mockStatus,
    }
  }
})
jest.mock('../../hooks/useEnableFBFriends', () => {
  return () => {
    return {
      mutate: mockUpdateFriends,
      loading: false,
      error: 'There is an error in updating friends',
      success: true,
      friends: [
        {
          id: '1',
          username: 'user1',
          firstName: 'friend',
          lastName: 'One',
          email: 'fone@g.com',
          password: 'hashed',
        },
      ],
      fbConnected: true,
    }
  }
})
jest.mock('../../hooks/useDeleteFBFriends', () => {
  return () => {
    return {
      mutate: mockDeleteFriends,
      loading: false,
      error: 'There is an error in deleting friends',
      success: true,
      friends: [],
      fbConnected: false,
    }
  }
})

describe('Friends', () => {
  test('renders without crashing and display toggle button OFF with message if fbConnected is false', async () => {
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )
    const toggleBtn = screen.getByRole('checkbox', { name: /Toggle Friends/i })

    expect(toggleBtn).toBeInTheDocument()

    expect(await screen.findByText('Connect FB Friends')).toBeInTheDocument()
    expect(await screen.queryByText('FB Friends Connected')).not.toBeInTheDocument()
  })

  test('on toggle switch to Enable, updateFriends should be triggered to enable FB friends and Sync button should appear', async () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Friends />
        </UserContext.Provider>
      </TestProvider>,
    )
    const toggleBtn = screen.getByRole('checkbox', { name: /Toggle Friends/i })

    await userEvent.click(toggleBtn)

    expect(mockUpdateFriends).toBeCalledWith({ username: 'kitty' })

    expect(await screen.findByText('Sync')).toBeInTheDocument()
  })

  test('renders without crashing and display toggle button ON with message if fbConnected is true', async () => {
    mockStatus = true
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )
    expect(await screen.queryByText('Connect FB Friends')).not.toBeInTheDocument()

    expect(await screen.findByText('FB Friends Connected')).toBeInTheDocument()
  })

  test('on Sync button click, updateFriends should be triggered to sync friends to latest', async () => {
    mockStatus = true
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )

    const syncBtn = await screen.findByText('Sync')

    await userEvent.click(syncBtn)

    expect(mockUpdateFriends).toBeCalledWith({ username: 'kitty' })
  })

  test('on toggle switch to Disable, deleteFriends should be triggered to disable FB friends connection and sync button should not be visible', async () => {
    mockStatus = true
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )
    const toggleBtn = screen.getByRole('checkbox', { name: /Toggle Friends/i })

    await userEvent.click(toggleBtn)

    expect(mockDeleteFriends).toBeCalledWith({ username: 'kitty' })

    expect(await screen.queryByText('Sync')).not.toBeInTheDocument()
  })

  test('if API calls have error, should display error message', () => {
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )

    expect(screen.getByRole('error-message-getFriends')).toHaveTextContent(
      'There is an error in fetching friends',
    )

    expect(screen.getByRole('error-message-updateFriends')).toHaveTextContent(
      'There is an error in updating friends',
    )

    expect(screen.getByRole('error-message-deleteFriends')).toHaveTextContent(
      'There is an error in deleting friends',
    )
  })
})
