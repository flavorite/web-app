import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import useRestaurantReviews from '../../hooks/useRestaurantReviews'

export default function Restaurant() {
  // TODO: Need to obtain restaurant ID from RestaurantList
  const restaurantId = '1'
  const { reviews, loading, error } = useRestaurantReviews({ restaurantId })

  const reviewsData = reviews.map((review, id) => {
    return <Stack key={id}>{review.content}</Stack>
  })
  return (
    <Container fixed>
      <Box>{reviewsData}</Box>
    </Container>
  )
}
