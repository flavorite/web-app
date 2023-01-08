import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'
import EditProfile from '../partials/EditProfile'

export default function Profile() {
  const { currentUser } = useContext(UserContext)
  const { username } = useParams()
  const profileUsername = username!
  const { user, loading: loadingUser, error: errorUser } = useUser({ username: profileUsername })

  return (
    <Spinner loading={loadingUser}>
      <Container>
        <Typography role='error-message-userData'>{errorUser && `${errorUser}`}</Typography>
        <Typography variant='h3' component='h3'>
          @{user.username}
        </Typography>
        {currentUser!.username === profileUsername && <EditProfile user={user}/>}
        <Button variant='contained'>
          <Link to={`/${user.username}/friends`}>View Friends</Link>
        </Button>
        <Button variant='contained'>
          <Link to={`/${user.username}/favorites`}>Favorite Dishes</Link>
        </Button>
        <Button variant='contained'>
          <Link to={`/${user.username}/reviews`}>View all Reviews</Link>
        </Button>
        {/* User's recent reviews (5 reviews) below Profile options */}
      </Container>
    </Spinner>
  )
}
