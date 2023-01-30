import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { ListReviews } from '../../client/flavorite'
import useReviewsByUser from '../../hooks/useReviewsByUser'
import Spinner from './Spinner'
import { UserContext } from './UserContext'

type reviewProps = {
  inputValue: string | null
  profileUsername: string
  profileView: boolean
}

export default function UserReviews({ inputValue, profileUsername, profileView }: reviewProps) {
  const { currentUser } = useContext(UserContext)
  const {
    reviews,
    loading: loadingReviews,
    error: errorReviews,
  } = useReviewsByUser({ username: profileUsername })
  const [reviewsToDisplay, setReviewsToDisplay] = useState<ListReviews['reviews']>(reviews)

  useEffect(() => {
    if (inputValue !== 'All' && inputValue !== '') {
      const filteredReviews = reviews.filter((review) => {
        return review.favoriteFood === inputValue
      })
      setReviewsToDisplay(filteredReviews)
    } else {
      setReviewsToDisplay(reviews)
    }
  }, [inputValue])

  const noReviewsMsg = (
    <Typography role='no-review-msg'>
      No reviews yet! <Link to='/'>Find restaurants to write a review</Link>
    </Typography>
  )

  {
    /* {currentUser!.username === profileUsername ? (
          <Button aria-label='edit-review'>
            <Link to={`/${profileUsername}/reviews/${review.id}`}>Edit</Link>
          </Button>
        ) : (
          ''
        )} */
  }

  const handleFlavorite = () => {
    // TODO update review to change starred to true
    console.log('flavortied')
  }
  const displayReviews = reviewsToDisplay.map((review, idx) => {
    return (
      <Card sx={{ marginTop: 5, width: 400 }} data-testid='reviewItems' key={`${review.id}-${idx}`}>
        <CardHeader
          action={
            currentUser!.username === profileUsername ? (
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            ) : (
              ''
            )
          }
          title={review.restaurant.name}
          subheader={`@${profileUsername}`}
        />
        <CardContent>
          <Rating value={review.rating} readOnly />
          <Typography variant='body1' color='text.primary'>
            {review.content}
          </Typography>
        </CardContent>
        {review.photoUrl ? (
          <CardMedia component='img' height='194' image={review.photoUrl} alt='uploaded img' />
        ) : (
          ''
        )}
        <CardActions disableSpacing>
          <Grid container justifyContent='space-between'>
            {currentUser!.username === profileUsername ? (
              <IconButton aria-label='flavoriteReview' onClick={handleFlavorite}>
                <FavoriteIcon />
              </IconButton>
            ) : (
              ''
            )}

            {review.createdAt === review.updatedAt ? (
              <Typography variant='caption' align='right'>
                Posted <Moment fromNow>{review.createdAt}</Moment>
              </Typography>
            ) : (
              <Typography variant='caption'>
                Edited <Moment fromNow>{review.updatedAt}</Moment>
              </Typography>
            )}
          </Grid>
        </CardActions>
      </Card>
    )
  })

  const profileViewReviews = reviewsToDisplay.slice(0, 5).map((review, idx) => {
    return (
      <Box sx={{ marginTop: 5 }} data-testid='reviewItems' key={`${review.id}-${idx}`}>
        <Typography>{review.restaurant.name}</Typography>
        <Typography>{profileUsername}</Typography>
        {currentUser!.username === profileUsername ? (
          <Button aria-label='edit-review'>
            <Link to={`/${profileUsername}/reviews/${review.id}`}>Edit</Link>
          </Button>
        ) : (
          ''
        )}
        <Rating value={review.rating} readOnly />
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
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography role='error-message-userReviews'>
          {errorReviews ? `${errorReviews}` : ''}
        </Typography>
        <Typography role='no-reviews-msg'>
          {reviewsToDisplay.length === 0 ? `${noReviewsMsg}` : ''}
        </Typography>
        <Box aria-label='reviews-list'>{profileView ? profileViewReviews : displayReviews}</Box>
      </Container>
    </Spinner>
  )
}
