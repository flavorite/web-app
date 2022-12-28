import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListReviews } from '../../client/flavorite'
import useReviewsByUser from '../../hooks/useReviewsByUser'
import Spinner from './Spinner'
import { UserContext } from './UserContext'

type reviewProps = {
  inputValue: string | null
  profileUsername: string
}

export default function UserReviews({ inputValue, profileUsername }: reviewProps) {
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

  const displayReviews = reviewsToDisplay.map((review, idx) => {
    return (
      <Stack data-testid='reviewItems' key={`${review.id}-${idx}`}>
        {review.content}
        {currentUser!.username === profileUsername && (
          <Button aria-label='edit-review'>
            <Link to={`/${profileUsername}/reviews/${review.id}`}>Edit</Link>
          </Button>
        )}
      </Stack>
    )
  })

  return (
    <Spinner loading={loadingReviews}>
      <Container>
        <Typography role='error-message-userReviews'>
          {errorReviews && `${errorReviews}`}
        </Typography>
        <Typography role='no-reviews-msg'>
          {reviewsToDisplay.length === 0 && `${noReviewsMsg}`}
        </Typography>
        <Box aria-label='reviews-list'>{displayReviews}</Box>
      </Container>
    </Spinner>
  )
}
