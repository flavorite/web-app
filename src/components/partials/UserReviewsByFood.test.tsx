import { render } from '@testing-library/react'
import TestProvider from './TestProvider'
import UserReviewsByFood from './UserReviewsByFood'

describe('UserReviewsByFood', () => {
  test('displays all reviews if inputValue is All', () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} />
      </TestProvider>,
    )
    // TODO
  })

  test('displays filtered reviews by favoriteFood name if inputValue is not All', async () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'sushi'} />
      </TestProvider>,
    )
    // TODO
  })

  test('displays error message if error in fetching reviews', async () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'sushi'} />
      </TestProvider>,
    )
    // TODO
  })
})
