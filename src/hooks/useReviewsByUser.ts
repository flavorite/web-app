import { GetUserByNameRequest, UsersApi } from '../client/flavorite/apis'
import { ListReviews } from '../client/flavorite/models'

export default function useReviewsByUser(username: GetUserByNameRequest) {
  const Users = new UsersApi()
  //   const fetchUserReviews = () => Users.getReviewsByUsername(username)
  //   const Reviews = useQuery(['reviewsByUser', username], fetchUserReviews)

  const reviewsList: ListReviews = {
    reviews: [
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
    ],
  }

  return {
    // loading: Reviews.isLoading,
    // error: Reviews.isError,
    // user: Reviews.data
    loading: false,
    error: null,
    reviews: reviewsList.reviews,
  }
}
