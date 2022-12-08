import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function Profile() {
  // TODO: Need to obtain username from user login
  const username = 'kitty'
  const { user, loading, error } = useUser({ username })
  return (
    <Container>
      <Typography variant='h3' component='h3'>
        @{user.username}
      </Typography>
      <Button variant='contained'>
        <Link to={`/${username}/friends`}>View Friends</Link>
      </Button>
      <Button variant='contained'>
        <Link to={`/${username}/favorites`}>Favorite Dishes</Link>
      </Button>
      <Button variant='contained'>
        <Link to={`/${username}/reviews`}>View all Reviews</Link>
      </Button>
      {/* TODO: Need to add Edit Profile , and User's recent reviews below Profile options */}
    </Container>
  )
}
