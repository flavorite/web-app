import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import Moment from 'react-moment'
import { Link, useLocation, useParams } from 'react-router-dom'
import useRestaurantReviews from '../../hooks/useRestaurantReviews'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'

export default function Restaurant() {
  const location = useLocation()
  const restaurantId = location.state.restaurantId
  const { currentUser } = useContext(UserContext)
  const { restaurantName } = useParams()
  const {
    reviews,
    loading: loadingReviews,
    error: errorReviews,
  } = useRestaurantReviews({ restaurantId })

  const displayReviews = reviews.map((review, idx) => {
    return (
      <Box sx={{ marginTop: 5 }} data-testid='reviewItems' key={`${review.id}-${idx}`}>
        <Typography>{review.restaurant.name}</Typography>
        <Typography>{review.user.username}</Typography>
        {currentUser!.username === review.user.username ? (
          <Button aria-label='edit-review'>
            <Link to={`/${review.user.username}/reviews/${review.id}`}>Edit</Link>
          </Button>
        ) : (
          ''
        )}
        <Typography>{review.content}</Typography>
        {review.createdAt === review.updatedAt ? (
          <Typography>
            Posted <Moment fromNow>{review.createdAt}</Moment>
          </Typography>
        ) : (
          <Typography>
            Edited <Moment fromNow>{review.updatedAt}</Moment>
          </Typography>
        )}
      </Box>
    )
  })
  return (
    <Spinner loading={loadingReviews}>
      <Container fixed>
        <Typography>{restaurantName}</Typography>
        <Typography role='error-message-restaurantReviews'>
          {errorReviews ? `${errorReviews}` : ''}
        </Typography>
        <Link to={`/writeareview/${restaurantName}`} state={{ restaurantId: restaurantId }}>
          <Button>Write a Review</Button>
        </Link>
        <Box>{displayReviews}</Box>
      </Container>
    </Spinner>
  )
}
