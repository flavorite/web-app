import { fireEvent, render, screen } from '@testing-library/react'
import TestProvider from '../partials/TestProvider'
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

  test('renders without crashing and display toggle button ON with message if fbConnected is true', async () => {
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )
    mockStatus = true
    expect(await screen.queryByText('Connect FB Friends')).not.toBeInTheDocument()

    expect(await screen.findByText('FB Friends Connected')).toBeInTheDocument()
  })

  test('on toggle switch to Enable, updateFriends should be triggered to enable FB friends and Sync button should appear', async () => {
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )
    const toggleBtn = screen.getByRole('checkbox', { name: /Toggle Friends/i })

    fireEvent.click(toggleBtn)
  })
  test('on Sync button click, updateFriends should be triggered to sync friends to latest', async () => {
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )
    // TODO
  })

  test('on toggle switch to Disable, updateFriends should be triggered to disable FB friends sync and return empty array', async () => {
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )
    // TODO
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
