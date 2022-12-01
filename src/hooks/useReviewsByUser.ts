import { ListReviews } from '../client/flavorite/models'
import Api from '../client/flavorite'
import { useQuery } from 'react-query'
import { GetUserByNameRequest } from '../client/flavorite/apis'

export default function useReviewsByUser(username: GetUserByNameRequest) {
  // const fetchUserReviews = Api.Users.getReviewsByUsername(username)
  // const Reviews = useQuery(['reviewsByUser', username], () => fetchUserReviews);

  const reviewsList: ListReviews = {
    reviews: [
      {
        id: 1,
        userId: 1,
        restaurantId: 1,
        content: 'one of my favs',
        rating: 5,
      },
      {
        id: 2,
        userId: 1,
        restaurantId: 2,
        content: 'So So',
        rating: 3,
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
