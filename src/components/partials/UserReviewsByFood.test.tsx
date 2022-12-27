import { render, screen } from '@testing-library/react'
import TestProvider from './TestProvider'
import UserReviewsByFood from './UserReviewsByFood'

let mockReviews = [
  {
    id: 1,
    userId: '1',
    restaurantId: 1,
    content: 'one of my fav sushi',
    rating: 5,
    favoriteFood: 'sushi',
    starred: true,
  },
  {
    id: 2,
    userId: '1',
    restaurantId: 2,
    content: 'So So pizza',
    rating: 3,
    favoriteFood: 'pizza',
    starred: false,
  },
]

jest.mock('../../hooks/useReviewsByUser', () => {
  return () => {
    return {
      loading: false,
      error: 'there is an error in fetching reviews',
      reviews: mockReviews,
    }
  }
})

describe('UserReviewsByFood', () => {
  test('displays all reviews if inputValue is All', () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} />
      </TestProvider>,
    )
    // TODO
  })

  test('displays filtered reviews by favoriteFood name if inputValue is not All ', async () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'sushi'} />
      </TestProvider>,
    )
    const reviewForSushi = await screen.findByText('one of my fav sushi')
    expect(reviewForSushi).toBeVisible()

    const reviewsList = screen.getByLabelText('reviews-list')
    expect(reviewsList).toHaveLength(1)
  })

  test('if no reviews to display for specific inputValue selected, should display noReviewMsg', async () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'food without review'} />
      </TestProvider>,
    )
    const noReviewMsg = await screen.getByRole('no-review-msg')
    expect(noReviewMsg).toHaveTextContent('No reviews yet!')
  })

  test('if user does not have any reviews, should display noReviewMsg', async () => {
    mockReviews = []

    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} />
      </TestProvider>,
    )

    const noReviewMsg = await screen.getByRole('no-review-msg')
    expect(noReviewMsg).toHaveTextContent('No reviews yet!')
  })

  test('displays error message if error in fetching reviews', async () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} />
      </TestProvider>,
    )
    const errorMsgUserReviews = screen.getByRole('error-message-userReviews')
    expect(errorMsgUserReviews).toHaveTextContent('there is an error in fetching reviews')
  })
})
