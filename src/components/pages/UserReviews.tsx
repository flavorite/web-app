import useReviewsByUser from '../../hooks/useReviewsByUser'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

export default function UserReviews() {
  // TODO: Need to obtain username from User login
  const username = 'kitty'
  const { reviews, loading, error } = useReviewsByUser({ username })

  const reviewsData = reviews.map((review, id) => {
    return <Stack key={id}>{review.content}</Stack>
  })
  return (
    <Container>
      <Box>{reviewsData}</Box>
    </Container>
  )
}
