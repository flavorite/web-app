import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditProfile from './EditProfile'
import TestProvider from './TestProvider'

const mockUpdateUser = jest.fn()

jest.mock('../../hooks/useUpdateUser', () => {
  return () => {
    return {
      mutate: mockUpdateUser,
      loading: false,
      error: 'There is an error in updating user information',
      success: true,
    }
  }
})

describe('EditProfile', () => {
  test('should render Edit button without crashing. OnClick Edit button, should display Dialog box with Form with current user information and change password button', async () => {
    render(
      <TestProvider>
        <EditProfile
          user={{
            id: '1',
            username: 'kitty',
            email: 'v@b.com',
            firstName: 'amy',
            lastName: 'do',
            password: 'testpw',
          }}
        />
      </TestProvider>,
    )

    const editProfileBtn = screen.getByLabelText('editprofile-button')
    expect(editProfileBtn).toBeInTheDocument()

    await userEvent.click(editProfileBtn)

    expect(await screen.findByLabelText('editprofile-dialog')).toBeVisible()
    expect(screen.getByDisplayValue('kitty')).toBeVisible()
    expect(screen.getByDisplayValue('v@b.com')).toBeVisible()
    expect(screen.getByDisplayValue('amy')).toBeVisible()
    expect(screen.getByDisplayValue('do')).toBeVisible()

    expect(await screen.findByLabelText('editprofile-changepw')).toBeVisible()
  })

  test('In dialog, if cancel button is clicked, dialog closes and userUpdate is not called', async () => {
    render(
      <TestProvider>
        <EditProfile
          user={{
            id: '1',
            username: 'kitty',
            email: 'v@b.com',
            firstName: 'amy',
            lastName: 'do',
            password: 'testpw',
          }}
        />
      </TestProvider>,
    )

    await userEvent.click(screen.getByLabelText('editprofile-button'))
    await userEvent.click(screen.getByLabelText('editprofile-cancel'))

    expect(await screen.findByLabelText('editprofile-dialog')).not.toBeVisible()
    expect(mockUpdateUser).not.toBeCalled()
  })

  test('In dialog, if Save button is clicked, userUpdate is called with fields with new data and dialog closes', async () => {
    render(
      <TestProvider>
        <EditProfile
          user={{
            id: '1',
            username: 'kitty',
            email: 'v@b.com',
            firstName: 'amy',
            lastName: 'do',
            password: 'testpw',
          }}
        />
      </TestProvider>,
    )

    await userEvent.click(screen.getByLabelText('editprofile-button'))

    const lastNameBox = screen.getByText('Last Name')
    const usernameBox = screen.getByText('Username')

    await userEvent.type(lastNameBox, '{backspace}{backspace}newLastName')

    await userEvent.type(
      usernameBox,
      '{backspace}{backspace}{backspace}{backspace}{backspace}newUsername',
    )

    await userEvent.click(screen.getByLabelText('editprofile-submit'))

    expect(await screen.findByLabelText('editprofile-dialog')).not.toBeVisible()

    expect(mockUpdateUser).toBeCalledWith({
      username: 'kitty',
      updateUser: {
        username: 'newUsername',
        lastName: 'newLastName',
      },
    })
  })

  test('In dialog, if Save button is clicked but nothing was changed, userUpdate is not called', async () => {
    render(
      <TestProvider>
        <EditProfile
          user={{
            id: '1',
            username: 'kitty',
            email: 'v@b.com',
            firstName: 'amy',
            lastName: 'do',
            password: 'testpw',
          }}
        />
      </TestProvider>,
    )

    await userEvent.click(screen.getByLabelText('editprofile-button'))

    await userEvent.click(screen.getByLabelText('editprofile-submit'))

    expect(mockUpdateUser).not.toBeCalled()
  })

  test('if updateUser has error, should display error message', () => {
    render(
      <TestProvider>
        <EditProfile
          user={{
            id: '1',
            username: 'kitty',
            email: 'v@b.com',
            firstName: 'amy',
            lastName: 'do',
            password: 'testpw',
          }}
        />
      </TestProvider>,
    )

    const errorMsg = screen.getByRole('error-message-updateUser')
    expect(errorMsg).toHaveTextContent('There is an error in updating user information')
  })
})
