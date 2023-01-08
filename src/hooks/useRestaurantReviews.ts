import { GetReviewByRestaurantRequest, RestaurantsApi } from '../client/flavorite/apis'
import { ListReviews } from '../client/flavorite/models'

export default function useRestaurantReviews(restaurantId: GetReviewByRestaurantRequest) {
  const Restaurants = new RestaurantsApi()
  //   const fetchRestaurantReviews = () => Restaurants.getReviewByRestaurant(restaurantId)
  //   const Reviews = useQuery(['reviewsByRestaurant', restaurantId], fetchRestaurantReviews)

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
          name: 'Pizzaria',
          longitude: 37.9736553,
          latitude: -122.0443956,
          address: '1679 Willow Pass Rd, Concord, CA 94520',
        },
        content: 'this is a good restaurant',
        rating: 5,
        favoriteFood: 'pizza',
        starred: true,
        createdAt: '12/20/2022',
        updatedAt: '12/20/2022',
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
          address: '1679 Willow Pass Rd, Concord, CA 94520',
        },
        content: 'pretty good',
        rating: 4,
        favoriteFood: 'pizza',
        starred: false,
        createdAt: '12/20/2022',
        updatedAt: '12/22/2022',
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
