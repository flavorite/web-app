import useRestaurantReviews from '../../hooks/useRestaurantReviews'

export default function Restaurant() {
  const restaurantId = 1
  const {reviews, loading, error} = useRestaurantReviews({restaurantId})

  const reviewsData = reviews.map((review, id) => {
    return (
      <div key={id}>
      {review.content}
      </div>
    )
  })
  return (
    <div>
      <h1>Restaurant information</h1>
      <h3>{reviewsData}</h3>
    </div>
  )
}
