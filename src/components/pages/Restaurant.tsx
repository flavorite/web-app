import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link, useLocation, useParams } from 'react-router-dom'
import useRestaurantReviews from '../../hooks/useRestaurantReviews'

export default function Restaurant() {
  const location = useLocation()
  const restaurantId = location.state.restaurantId
  const { restaurantName } = useParams()
  const { reviews, loading, error } = useRestaurantReviews({ restaurantId })

  const reviewsData = reviews.map((review, id) => {
    return <Stack key={id}>{review.content}</Stack>
  })
  return (
    <Container fixed>
      <Typography>{restaurantName}</Typography>
      <Link to={`/writeareview/${restaurantName}`} state={{ restaurantId: restaurantId }}>
        <Button>Write a Review</Button>
      </Link>
      <Box>{reviewsData}</Box>
    </Container>
  )
}
