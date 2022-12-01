import { useMutation, useQueryClient } from 'react-query'
import Api from '../client/flavorite'
import { AddReviewRequest } from '../client/flavorite/apis'
import { CreateReview } from '../client/flavorite/models'

export default function useCreateReview() {
  const queryClient = useQueryClient()

  const newReview = useMutation(
    (newReviewData: AddReviewRequest) => Api.Reviews.addReview(newReviewData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('review')
      },
    },
  )

  const review: CreateReview = {
    userId: 1,
    restaurantId: 2,
    rating: 5,
    content: 'good'
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
