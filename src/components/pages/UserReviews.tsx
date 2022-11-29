import useReviewsByUser from '../../hooks/useReviewsByUser'

export default function UserReviews() {

  const username = 'kitty'
  const {reviews, loading, error} = useReviewsByUser({username})

  const reviewsData = reviews.map(review => {
    return (
      <>
      {review.content}
      </>
    )
  })
  return (
    <div>
      {reviewsData}
    </div>
  )
}
