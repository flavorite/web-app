import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'
import useRestaurantReviews from '../../hooks/useRestaurantReviews'

export default function Restaurant() {
  const location = useLocation()
  const restaurantId = location.state.restaurant.id
  const { reviews, loading, error } = useRestaurantReviews({ restaurantId })

  const reviewsData = reviews.map((review, id) => {
    return <Stack key={id}>{review.content}</Stack>
  })
  return (
    <Container fixed>
      <Typography>{location.state.restaurant.name}</Typography>
      <Link
        to={`/writeareview/${location.state.restaurant.name}`}
        state={{ restaurant: location.state.restaurant }}
      >
        <Button>Write a Review</Button>
      </Link>
      <Box>{reviewsData}</Box>
    </Container>
  )
}
