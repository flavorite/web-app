import { render, screen } from '@testing-library/react'
import TestProvider from '../partials/TestProvider'
import Friends from './Friends'

const mockUpdateFriends = jest.fn()

jest.mock('../../hooks/useFriends', () => {
  return () => {
    return {
      loading: false,
      error: 'There is an error in fetching friends',
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
    }
  }
})

describe('Friends', () => {
  test('renders without crashing', () => {
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )
    const toggleBtn = screen.getByRole('checkbox', { name: /Toggle Friends/i })

    expect(toggleBtn).toBeInTheDocument()
  })

  test('on toggle switch to Enable, updateFriends should be triggered to enable FB friends and Sync button should appear', async () => {
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )
    // TODO
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

  test('if useFriends / updateFriends has error, should display error message', () => {
    render(
      <TestProvider>
        <Friends />
      </TestProvider>,
    )

    const errorMsgGetFriends = screen.getByRole('error-message-getFriends')
    expect(errorMsgGetFriends).toHaveTextContent('There is an error in fetching friends')

    // TODO for UpdateFriends error
  })
})
