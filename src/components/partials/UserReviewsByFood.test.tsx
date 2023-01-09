import { render, screen } from '@testing-library/react'
import TestProvider from './TestProvider'
import { UserContext } from './UserContext'
import UserReviewsByFood from './UserReviewsByFood'

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
      id: '2',
      name: 'Kansai Sushi',
      longitude: 37.9736553,
      latitude: -122.0443956,
      address: '1679 Willow Pass Rd, Concord, CA 94520',
    },
    content: 'one of my fav sushi',
    rating: 5,
    favoriteFood: 'sushi',
    starred: true,
    createdAt: '12/20/2022',
    updatedAt: '12/21/2022',
  },
  {
    id: '2',
    user: {
      id: '1',
      username: 'kitty',
      email: 'v@b.com',
      firstName: 'valerie',
      lastName: 'yang',
      password: 'testpw',
    },
    restaurant: {
      id: '2',
      name: 'Pizzaria',
      longitude: 37.9736553,
      latitude: -122.0443956,
      address: '1690 Willow Pass Rd, Concord, CA 94520',
    },
    content: 'So So pizza',
    rating: 3,
    favoriteFood: 'pizza',
    starred: false,
    createdAt: '12/20/2022',
    updatedAt: '12/20/2022',
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
          <UserReviewsByFood inputValue={'All'} profileUsername={'kitty'} profileView={false} />
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
          <UserReviewsByFood
            inputValue={'All'}
            profileUsername={'anotherUser'}
            profileView={false}
          />
        </UserContext.Provider>
      </TestProvider>,
    )

    const editBtns = screen.queryAllByRole('button', { name: 'edit-review' })
    expect(editBtns).toHaveLength(0)
  })

  test('displays all reviews if inputValue is All', () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} profileUsername={'kitty'} profileView={false} />
      </TestProvider>,
    )

    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(2)
  })

  test('displays filtered reviews by favoriteFood name if inputValue is not All ', () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'sushi'} profileUsername={'kitty'} profileView={false} />
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
        <UserReviewsByFood
          inputValue={'food without review'}
          profileUsername={'kitty'}
          profileView={false}
        />
      </TestProvider>,
    )
    const noReviewMsg = screen.getByRole('no-reviews-msg')
    expect(noReviewMsg).toBeVisible()
    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(0)
  })

  test('for profileView, should only display most recent 5 reviews', () => {
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
          id: '2',
          name: 'Kansai Sushi',
          longitude: 37.9736553,
          latitude: -122.0443956,
          address: '1679 Willow Pass Rd, Concord, CA 94520',
        },
        content: 'one of my fav sushi',
        rating: 5,
        favoriteFood: 'sushi',
        starred: true,
        createdAt: '12/20/2022',
        updatedAt: '12/21/2022',
      },
      {
        id: '2',
        user: {
          id: '1',
          username: 'kitty',
          email: 'v@b.com',
          firstName: 'valerie',
          lastName: 'yang',
          password: 'testpw',
        },
        restaurant: {
          id: '2',
          name: 'Pizzaria',
          longitude: 37.9736553,
          latitude: -122.0443956,
          address: '1690 Willow Pass Rd, Concord, CA 94520',
        },
        content: 'So So pizza',
        rating: 3,
        favoriteFood: 'pizza',
        starred: false,
        createdAt: '12/20/2022',
        updatedAt: '12/20/2022',
      },
      {
        id: '3',
        user: {
          id: '1',
          username: 'kitty',
          email: 'v@b.com',
          firstName: 'valerie',
          lastName: 'yang',
          password: 'testpw',
        },
        restaurant: {
          id: '3',
          name: 'KoreanBBQ',
          longitude: 37.9736553,
          latitude: -122.0443956,
          address: '1690 Willow Pass Rd, Concord, CA 94520',
        },
        content: 'nice KBBQ',
        rating: 4,
        favoriteFood: 'bbq',
        starred: false,
        createdAt: '12/19/2022',
        updatedAt: '12/19/2022',
      },
      {
        id: '4',
        user: {
          id: '1',
          username: 'kitty',
          email: 'v@b.com',
          firstName: 'valerie',
          lastName: 'yang',
          password: 'testpw',
        },
        restaurant: {
          id: '2',
          name: 'Dominos',
          longitude: 37.9736553,
          latitude: -122.0443956,
          address: '1690 Willow Pass Rd, Concord, CA 94520',
        },
        content: 'awesome pizza',
        rating: 5,
        favoriteFood: 'pizza',
        starred: false,
        createdAt: '12/18/2022',
        updatedAt: '12/18/2022',
      },
      {
        id: '5',
        user: {
          id: '1',
          username: 'kitty',
          email: 'v@b.com',
          firstName: 'valerie',
          lastName: 'yang',
          password: 'testpw',
        },
        restaurant: {
          id: '7',
          name: 'Momoyama',
          longitude: 37.9736553,
          latitude: -122.0443956,
          address: '1690 Willow Pass Rd, Concord, CA 94520',
        },
        content: 'best sushi in town',
        rating: 5,
        favoriteFood: 'sushi',
        starred: false,
        createdAt: '12/10/2022',
        updatedAt: '12/11/2022',
      },
      {
        id: '6',
        user: {
          id: '1',
          username: 'kitty',
          email: 'v@b.com',
          firstName: 'valerie',
          lastName: 'yang',
          password: 'testpw',
        },
        restaurant: {
          id: '10',
          name: 'Ramen 101',
          longitude: 37.9736553,
          latitude: -122.0443956,
          address: '1690 Willow Pass Rd, Concord, CA 94520',
        },
        content: 'Alright',
        rating: 3,
        favoriteFood: 'ramen',
        starred: false,
        createdAt: '12/15/2022',
        updatedAt: '12/20/2022',
      },
    ]
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} profileUsername={'kitty'} profileView={true} />
      </TestProvider>,
    )

    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(5)
  })

  test('if user does not have any reviews, should display noReviewMsg', () => {
    mockReviews = []

    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} profileUsername={'kitty'} profileView={false} />
      </TestProvider>,
    )

    const noReviewMsg = screen.getByRole('no-reviews-msg')
    expect(noReviewMsg).toBeVisible()
    expect(screen.queryAllByTestId('reviewItems')).toHaveLength(0)
  })

  test('displays error message if error in fetching reviews', () => {
    render(
      <TestProvider>
        <UserReviewsByFood inputValue={'All'} profileUsername={'kitty'} profileView={false} />
      </TestProvider>,
    )
    const errorMsgUserReviews = screen.getByRole('error-message-userReviews')
    expect(errorMsgUserReviews).toHaveTextContent('there is an error in fetching reviews')
  })
})
