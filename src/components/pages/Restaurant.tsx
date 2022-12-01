import useRestaurantReviews from '../../hooks/useRestaurantReviews'
import * as Mui from '@mui/material'

export default function Restaurant() {
  const restaurantId = 1
  const { reviews, loading, error } = useRestaurantReviews({ restaurantId })

  const reviewsData = reviews.map((review, id) => {
    return <div key={id}>{review.content}</div>
  })
  return (
    <Mui.Container fixed>
      <Mui.Box>{reviewsData}</Mui.Box>
    </Mui.Container>
  )
}
