import { render, screen } from '@testing-library/react'
import { useUserAuth } from '../../hooks/useUserAuth'
import NavBar from './NavBar'
import TestProvider from './TestProvider'

// const mockedUseUserAuth = jest
//   .fn<typeof useUserAuth, []>(() => {
//     return () => {
//       return {
//         username: null,
//         logOut: jest.fn(),
//       }
//     }
//   })
//   .mockImplementationOnce(() => {
//     return () => {
//       return {
//         username: null,
//         logOut: jest.fn(),
//       }
//     }
//   })
//   .mockImplementationOnce(() => {
//     return () => {
//       return {
//         username: null,
//         logOut: jest.fn(),
//       }
//     }
//   })

jest.mock('../../hooks/useUserAuth', () => {
  jest.fn()
})

describe('NavBar', () => {
  test('renders navbar without crashing', () => {
    render(
      <TestProvider>
        <NavBar />
      </TestProvider>,
    )
    const navBar = screen.getByRole('banner')
    expect(navBar).toBeInTheDocument()
  })

  test('if no user, display Login & Register options, and hide User options', async () => {
    render(
      <TestProvider>
        <NavBar />
      </TestProvider>,
    )

    ;(useUserAuth as jest.Mock).mockImplementationOnce(() => {
      return () => {
        return {
          username: null,
          logOut: jest.fn(),
        }
      }
    })

    // user options menu button hidden
    const userOptionsBtn = screen.getByLabelText('user options')
    expect(userOptionsBtn).not.toBeVisible()

    // login & register buttons displayed
    const LoggedoutMenuXs = screen.getByLabelText('loggedOutMenu xs')
    const LoggedoutMenuMd = screen.getByLabelText('loggedOutMenu md')

    expect(LoggedoutMenuXs).toBeVisible()
    expect(LoggedoutMenuMd).toBeVisible()
  })

  test('if user, hide Login & Register options, and display User options', async () => {
    render(
      <TestProvider>
        <NavBar />
      </TestProvider>,
    )

    // mockedUseUserAuth.mockImplementationOnce(() => {
    //   return {
    //     username: 'kitty',
    //     logOut: jest.fn(),
    //   }
    // })

    // user options menu button displayed
    const userOptionsBtn = screen.getByLabelText('user options')
    expect(userOptionsBtn).toBeVisible()

    // login & register buttons hidden
    const LoggedoutMenuXs = screen.getByLabelText('loggedOutMenu xs')
    const LoggedoutMenuMd = screen.getByLabelText('loggedOutMenu md')

    expect(LoggedoutMenuXs).not.toBeVisible()
    expect(LoggedoutMenuMd).not.toBeVisible()
  })
})
