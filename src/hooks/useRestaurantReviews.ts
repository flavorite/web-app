import { GetReviewByRestaurantRequest, RestaurantsApi } from '../client/flavorite/apis'
import { ListReviews } from '../client/flavorite/models'

export default function useRestaurantReviews(restaurantId: GetReviewByRestaurantRequest) {
  const Restaurants = new RestaurantsApi()
  //   const fetchRestaurantReviews = () => Restaurants.getReviewByRestaurant(restaurantId)
  //   const Reviews = useQuery(['reviewsByRestaurant', restaurantId], fetchRestaurantReviews)

  const reviewsList: ListReviews = {
    reviews: [
      {
        id: 1,
        userId: '2',
        restaurantId: 1,
        content: 'this is a good restaurant',
        rating: 5,
        favoriteFood: 'pizza',
        starred: true,
      },
      {
        id: 2,
        userId: '1',
        restaurantId: 1,
        content: 'pretty good',
        rating: 4,
        favoriteFood: 'pizza',
        starred: false,
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
