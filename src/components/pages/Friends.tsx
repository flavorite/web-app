import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'

export default function Friends() {
  // TODO: replace with 'Friends' objects from useUser()
  const friends = ['Jake', 'Jason', 'Jamie']

  const friendsList = friends.map((friend, id) => {
    return (
      <Link to={`/${friend}`} key={id}>
        {friend}
      </Link>
    )
  })

  return (
    <Container fixed>
      {/* TODO: Enable user to connect to FB friends if not done yet */}
      <Stack spacing={2}>{friendsList}</Stack>
    </Container>
  )
}
