import useReviewsByUser from '../../hooks/useReviewsByUser'
import * as Mui from '@mui/material'

export default function UserReviews() {
  const username = 'kitty'
  const { reviews, loading, error } = useReviewsByUser({ username })

  const reviewsData = reviews.map((review, id) => {
    return <Mui.Stack key={id}>{review.content}</Mui.Stack>
  })
  return (
  <Mui.Container>
    <Mui.Box>
    {reviewsData}

    </Mui.Box>
    </Mui.Container>
  )
}
