import { render, screen } from '@testing-library/react'
import TestProvider from '../partials/TestProvider'
import { UserContext } from '../partials/UserContext'
import Restaurant from './Restaurant'

let mockReviews = [{}]

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
  test('renders without crashing and displays edit button on review if currentUser is the creator of the review. Should display Posted date if it has not been edited', () => {
    mockReviews = [
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
    ]
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
    const restaurantName = screen.getByRole('page-title')
    expect(restaurantName).toBeInTheDocument()
    expect(restaurantName.textContent).toBe('testRestaurant')

    expect(screen.getByRole('new-review-btn')).toBeInTheDocument()

    const reviewContent = screen.getByText('one of my fav sushi')
    expect(reviewContent).toBeVisible()

    const postedDate = screen.getByText('Posted')
    expect(postedDate).toBeInTheDocument()
    const editedDate = screen.queryByText('Edited')
    expect(editedDate).not.toBeInTheDocument()

    const editBtns = screen.getAllByRole('button', { name: 'edit-review' })
    expect(editBtns).toHaveLength(1)
  })

  test('edit button should be hidden if currentUser does not match profileUser. Should display Edited date if post has been updated since creation', () => {
    mockReviews = [
      {
        id: '1',
        user: {
          id: '2',
          username: 'otherUser',
          email: 'other@b.com',
          firstName: 'other',
          lastName: 'user',
          password: 'testpwother',
        },
        restaurant: {
          id: '1',
          name: 'testRestaurant',
          longitude: 37.9736553,
          latitude: -122.0443956,
          address: '1679 Willow Pass Rd, Concord, CA 94520',
        },
        content: 'Good sushi',
        rating: 3,
        favoriteFood: 'sushi',
        starred: true,
        createdAt: '12/20/2022',
        updatedAt: '12/22/2022',
      },
    ]
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

    const reviewContent = screen.getByText('Good sushi')
    expect(reviewContent).toBeVisible()

    const postedDate = screen.queryByText('Posted')
    expect(postedDate).not.toBeInTheDocument()
    const editedDate = screen.getByText('Edited')
    expect(editedDate).toBeInTheDocument()

    const editBtns = screen.queryAllByRole('button', { name: 'edit-review' })
    expect(editBtns).toHaveLength(0)
  })

  test('displays error message if error in fetching restaurant reviews', () => {
    render(
      <TestProvider>
        <Restaurant />
      </TestProvider>,
    )
    const errorMsgUserReviews = screen.getByRole('error-message-restaurantReviews')
    expect(errorMsgUserReviews).toHaveTextContent(
      'there is an error in fetching restaurant reviews',
    )
  })
})
