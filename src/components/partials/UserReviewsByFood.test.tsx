import { render, screen } from '@testing-library/react'
import TestProvider from './TestProvider'
import { UserContext } from './UserContext'
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
  test('renders without crashing and displays edit button if currentUser is the profileUser', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <UserReviewsByFood inputValue={'All'} profileUsername={'kitty'} />
        </UserContext.Provider>
      </TestProvider>,
    )
    const reviewForSushi = screen.getByText('one of my fav sushi')
    expect(reviewForSushi).toBeVisible()
    const reviewForPizza = screen.getByText('So So pizza')
    expect(reviewForPizza).toBeVisible()

    const editBtns = screen.getAllByRole('button', { name: 'edit-review' })
    expect(editBtns).toHaveLength(2)
  })

  test('edit button should be hidden if currentUser does not match profileUser', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <UserReviewsByFood inputValue={'All'} profileUsername={'anotherUser'} />
        </UserContext.Provider>
      </TestProvider>,
    )

    const editBtns = screen.queryAllByRole('button', { name: 'edit-review' })
    expect(editBtns).toHaveLength(0)
  })

  test('displays all reviews if inputValue is All', () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} profileUsername={'kitty'} />
      </TestProvider>,
    )

    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(2)
  })

  test('displays filtered reviews by favoriteFood name if inputValue is not All ', () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'sushi'} profileUsername={'kitty'} />
      </TestProvider>,
    )
    const reviewForSushi = screen.getByText('one of my fav sushi')
    expect(reviewForSushi).toBeVisible()
    const reviewForPizza = screen.queryByText('So So pizza')
    expect(reviewForPizza).toBeNull()
    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(1)
  })

  test('if no reviews to display for specific inputValue selected, should display noReviewMsg', () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'food without review'} profileUsername={'kitty'} />
      </TestProvider>,
    )
    const noReviewMsg = screen.getByRole('no-reviews-msg')
    expect(noReviewMsg).toBeVisible()
    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(0)
  })

  test('if user does not have any reviews, should display noReviewMsg', () => {
    mockReviews = []

    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} profileUsername={'kitty'} />
      </TestProvider>,
    )

    const noReviewMsg = screen.getByRole('no-reviews-msg')
    expect(noReviewMsg).toBeVisible()
    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(0)
  })

  test('displays error message if error in fetching reviews', () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} profileUsername={'kitty'} />
      </TestProvider>,
    )
    const errorMsgUserReviews = screen.getByRole('error-message-userReviews')
    expect(errorMsgUserReviews).toHaveTextContent('there is an error in fetching reviews')
  })
})
