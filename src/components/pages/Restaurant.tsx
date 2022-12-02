import useRestaurantReviews from '../../hooks/useRestaurantReviews'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export default function Restaurant() {
  const restaurantId = 1
  const { reviews, loading, error } = useRestaurantReviews({ restaurantId })

  const reviewsData = reviews.map((review, id) => {
    return <div key={id}>{review.content}</div>
  })
  return (
    <Container fixed>
      <Box>{reviewsData}</Box>
    </Container>
  )
}
