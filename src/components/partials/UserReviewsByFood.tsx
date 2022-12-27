import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import useReviewsByUser from '../../hooks/useReviewsByUser'
import Spinner from './Spinner'
import { UserContext } from './UserContext'

type reviewProps = {
  inputValue: string
}

export default function UserReviews({ inputValue }: reviewProps) {
  const { currentUser } = useContext(UserContext)
  const username = currentUser!.username
  const { reviews, loading: loadingReviews, error: errorReviews } = useReviewsByUser({ username })

  const displayReviews = reviews.map((review, id) => {
    if (inputValue === 'All' || inputValue === '') {
      return <Stack key={id}>{review.content}</Stack>
    } else {
      if (inputValue === review.favoriteFood) {
        return <Stack key={id}>{review.content}</Stack>
      }
    }
  })

  return (
    <Spinner loading={loadingReviews}>
      <Container>
        <Typography role='error-message-userReviews'>
          {errorReviews ? `${errorReviews}` : ''}
        </Typography>
        <Box>{displayReviews}</Box>
      </Container>
    </Spinner>
  )
}
