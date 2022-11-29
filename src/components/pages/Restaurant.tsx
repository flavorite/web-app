import useRestaurantReviews from '../../hooks/useRestaurantReviews'

export default function Restaurant() {
  const restaurantId = 1
  const {reviews, loading, error} = useRestaurantReviews({restaurantId})
  return (
    <div>
      <h1>Restaurant's information</h1>
      <h3>List of reviews posted for this restaurant</h3>
    </div>
  )
}
