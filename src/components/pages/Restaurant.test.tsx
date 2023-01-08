import { render, screen } from '@testing-library/react'
import TestProvider from '../partials/TestProvider'
import { UserContext } from '../partials/UserContext'
import Restaurant from './Restaurant'

let mockReviews = [
  {
    id: '1',
    user: {
      id: '1',
      username: 'kitty',
      email: 'v@b.com',
      firstName: 'valerie',
      lastName: 'yang',
      password: 'testpw',
    },
    restaurant: {
      id: '1',
      name: 'testRestaurant',
      longitude: 37.9736553,
      latitude: -122.0443956,
      address: '1679 Willow Pass Rd, Concord, CA 94520',
    },
    content: 'one of my fav sushi',
    rating: 5,
    favoriteFood: 'sushi',
    starred: true,
    createdAt: '12/20/2022',
    updatedAt: '12/20/2022',
  },
  {
    id: '2',
    user: {
      id: '2',
      username: 'otherUser',
      email: 'other@b.com',
      firstName: 'other',
      lastName: 'user',
      password: 'testpw2',
    },
    restaurant: {
      id: '1',
      name: 'testRestaurant',
      longitude: 37.9736553,
      latitude: -122.0443956,
      address: '1679 Willow Pass Rd, Concord, CA 94520',
    },
    content: 'sushi is the best',
    rating: 5,
    favoriteFood: 'sushi',
    starred: true,
    createdAt: '12/20/2022',
    updatedAt: '12/21/2022',
  },
]

jest.mock('../../hooks/useRestaurantReviews', () => {
  return () => {
    return {
      loading: false,
      success: true,
      error: 'there is an error in fetching restaurant reviews',
      reviews: mockReviews,
    }
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    restaurantName: 'testRestaurant',
  }),
  useLocation: () => ({
    state: { restaurantId: '1' },
  }),
}))

describe('UserReviewsByFood', () => {
  test('renders without crashing and displays edit button on review if currentUser is the creator of the review', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Restaurant />
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
          <Restaurant />
        </UserContext.Provider>
      </TestProvider>,
    )

    const editBtns = screen.queryAllByRole('button', { name: 'edit-review' })
    expect(editBtns).toHaveLength(0)
  })

  test('displays all reviews if inputValue is All', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Restaurant />
        </UserContext.Provider>
      </TestProvider>,
    )

    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(2)
  })

  test('displays filtered reviews by favoriteFood name if inputValue is not All ', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Restaurant />
        </UserContext.Provider>
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
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Restaurant />
        </UserContext.Provider>
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
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Restaurant />
        </UserContext.Provider>
      </TestProvider>,
    )

    const noReviewMsg = screen.getByRole('no-reviews-msg')
    expect(noReviewMsg).toBeVisible()
    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(0)
  })

  test('displays error message if error in fetching reviews', () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <Restaurant />
        </UserContext.Provider>
      </TestProvider>,
    )
    const errorMsgUserReviews = screen.getByRole('error-message-userReviews')
    expect(errorMsgUserReviews).toHaveTextContent('there is an error in fetching reviews')
  })
})
