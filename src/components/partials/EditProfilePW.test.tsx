import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditProfilePW from './EditProfilePW'
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

describe('EditProfilePW', () => {
  test('should render Change Password button without crashing. OnClick Change Password button, should display Dialog box', async () => {
    render(
      <TestProvider>
        <EditProfilePW
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

    const changePWBtn = screen.getByLabelText('editprofile-changepw')
    expect(changePWBtn).toBeInTheDocument()

    await userEvent.click(changePWBtn)

    expect(await screen.findByLabelText('changepw-dialog')).toBeVisible()
    expect(screen.getByLabelText('Current Password')).toBeVisible()
    expect(screen.getByLabelText('New Password')).toBeVisible()
    expect(screen.getByLabelText('Confirm New Password')).toBeVisible()
  })

  test('In dialog, if cancel button is clicked, dialog closes and userUpdate is not called', async () => {
    render(
      <TestProvider>
        <EditProfilePW
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

    await userEvent.click(screen.getByLabelText('editprofile-changepw'))
    await userEvent.click(screen.getByLabelText('changepw-cancel'))

    expect(await screen.findByLabelText('changepw-dialog')).not.toBeVisible()
    expect(mockUpdateUser).not.toBeCalled()
  })

  test('In dialog, onClick Save button, if current password does not match with user data, display error message', async () => {
    render(
      <TestProvider>
        <EditProfilePW
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

    await userEvent.click(screen.getByLabelText('editprofile-changepw'))

    const currentPWBox = screen.getByLabelText('Current Password')
    const newPWBox = screen.getByLabelText('New Password')
    const confirmNewPWBox = screen.getByLabelText('Confirm New Password')

    await userEvent.type(currentPWBox, 'wrong current password')
    await userEvent.type(newPWBox, 'newpw')
    await userEvent.type(confirmNewPWBox, 'newpw')

    await userEvent.click(screen.getByLabelText('changepw-submit'))

    expect(screen.getByRole('error-message-pwcheck')).toBeVisible()
    expect(mockUpdateUser).not.toBeCalled()
  })

  test('In dialog, onClick Save button, if New Password and Confirm New Password do not match, display error message', async () => {
    render(
      <TestProvider>
        <EditProfilePW
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

    await userEvent.click(screen.getByLabelText('editprofile-changepw'))

    const currentPWBox = screen.getByLabelText('Current Password')
    const newPWBox = screen.getByLabelText('New Password')
    const confirmNewPWBox = screen.getByLabelText('Confirm New Password')

    await userEvent.type(currentPWBox, 'testpw')
    await userEvent.type(newPWBox, 'newpw')
    await userEvent.type(confirmNewPWBox, 'wrong new password')

    await userEvent.click(screen.getByLabelText('changepw-submit'))

    expect(screen.getByRole('error-message-pwcheck')).toBeVisible()
    expect(mockUpdateUser).not.toBeCalled()
  })

  test('In dialog, onClick Save button, if New Password and Confirm New Password fields are both empty, display error message', async () => {
    render(
      <TestProvider>
        <EditProfilePW
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

    await userEvent.click(screen.getByLabelText('editprofile-changepw'))

    const currentPWBox = screen.getByLabelText('Current Password')

    await userEvent.type(currentPWBox, 'testpw')

    await userEvent.click(screen.getByLabelText('changepw-submit'))

    expect(screen.getByRole('error-message-pwcheck')).toBeVisible()
    expect(mockUpdateUser).not.toBeCalled()
  })

  test('In dialog, onClick Save button, if all data is validated, should call updateUser and close dialog', async () => {
    render(
      <TestProvider>
        <EditProfilePW
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

    await userEvent.click(screen.getByLabelText('editprofile-changepw'))

    const currentPWBox = screen.getByLabelText('Current Password')
    const newPWBox = screen.getByLabelText('New Password')
    const confirmNewPWBox = screen.getByLabelText('Confirm New Password')

    await userEvent.type(currentPWBox, 'testpw')
    await userEvent.type(newPWBox, 'newpw')
    await userEvent.type(confirmNewPWBox, 'newpw')

    await userEvent.click(screen.getByLabelText('changepw-submit'))

    expect(await screen.findByLabelText('changepw-dialog')).not.toBeVisible()

    expect(mockUpdateUser).toBeCalledWith({
      username: 'kitty',
      updateUser: {
        password: 'newpw',
      },
    })
  })

  test('if updateUser has error, should display error message', () => {
    render(
      <TestProvider>
        <EditProfilePW
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
