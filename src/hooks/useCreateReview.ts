import { useMutation, useQueryClient } from 'react-query'
import { AddReviewRequest, ReviewsApi } from '../client/flavorite/apis'
import { CreateReview } from '../client/flavorite/models'

export default function useCreateReview() {
  const queryClient = useQueryClient()
  const Reviews = new ReviewsApi()

  const newReview = useMutation(
    (newReviewData: AddReviewRequest) => Reviews.addReview(newReviewData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('review')
      },
    },
  )

  const review: CreateReview = {
    userId: '1',
    restaurantId: '2',
    rating: 5,
    content: 'good',
    favoriteFood: 'sushi',
    starred: false,
  }

  return {
    mutate: newReview.mutate,
    // loading: newUser.isLoading,
    // error: newUser.isError,
    // success: newUser.isSuccess,
    // user: newUser.data
    loading: false,
    error: null,
    success: true,
    review: review,
  }
}
