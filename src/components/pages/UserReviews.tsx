import useReviewsByUser from '../../hooks/useReviewsByUser'
import * as Mui from '@mui/material';

export default function UserReviews() {

  const username = 'kitty'
  const {reviews, loading, error} = useReviewsByUser({username})

  const reviewsData = reviews.map((review, id) => {
    return (
      <div key={id}>
      {review.content}
      </div>
    )
  })
  return (
    <div>
      {reviewsData}
    </div>
  )
}
