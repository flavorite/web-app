import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TestProvider from '../partials/TestProvider'
import Login from './Login'

const mockLoginUser = jest.fn()

jest.mock('../../hooks/useLoginUser', () => {
  return () => {
    return {
      mutate: mockLoginUser,
      loading: false,
      error: 'There is an error in login',
      success: true,
      user: {
        username: 'kitty',
        token: 'tokenString',
      },
    }
  }
})

describe('Login', () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn())

  test('renders login form without crashing', () => {
    render(
      <TestProvider>
        <Login />
      </TestProvider>,
    )
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  test('all fields are required in form and user can type', async () => {
    render(
      <TestProvider>
        <Login />
      </TestProvider>,
    )

    const emailBox = screen.getByLabelText(/Email/i)
    const passwordBox = screen.getByLabelText(/Password/i)

    expect(emailBox).toBeRequired()
    expect(passwordBox).toBeRequired()

    await userEvent.type(emailBox, 'ado@g.com')
    await userEvent.type(passwordBox, '12345')

    expect(emailBox).toHaveValue('ado@g.com')
    expect(passwordBox).toHaveValue('12345')
  })

  // Test onSubmit
  test('onClick submit button, should post form data', async () => {
    render(
      <TestProvider>
        <Login />
      </TestProvider>,
    )

    // input form
    const emailBox = screen.getByLabelText(/Email/i) as HTMLInputElement
    const passwordBox = screen.getByLabelText(/Password/i) as HTMLInputElement

    fireEvent.change(emailBox, { target: { value: 'aDo@g.com' } })
    fireEvent.change(passwordBox, { target: { value: '12345' } })

    // when button clicked:
    const submitBtn = screen.getByRole('button', { name: /Sign In/i })
    await userEvent.click(submitBtn)

    expect(mockLoginUser).toBeCalledWith({
      loginUser: {
        email: emailBox.value,
        password: passwordBox.value,
      },
    })

    // on success, localStorage item is set with token received
    expect(window.localStorage.setItem).toBeCalledWith('token', 'tokenString')

    // on success, reroute to profile page of logged in user
    expect(location.pathname).toEqual('/kitty')
  })

  // Test error case
  test('if loginUser has error, display error message on Login Form', async () => {
    render(
      <TestProvider>
        <Login />
      </TestProvider>,
    )

    const errorMsg = screen.getByRole('error-message')
    expect(errorMsg).toHaveTextContent('There is an error in login')
  })
})
