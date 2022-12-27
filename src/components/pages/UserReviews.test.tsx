import { render } from '@testing-library/react'
import TestProvider from '../partials/TestProvider'
import UserReviews from './UserReviews'

describe('UserReviews', () => {
  test('renders input box and reviews without crashing', () => {
    render(
      <TestProvider>
        <UserReviews />
      </TestProvider>,
    )
    // TODO
  })

  test('displays error message if error in fetching favorite foods for select options', async () => {
    render(
      <TestProvider>
        <UserReviews />
      </TestProvider>,
    )
    // TODO
  })
})
