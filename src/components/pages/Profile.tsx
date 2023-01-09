import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import EditProfile from '../partials/EditProfile'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'
import UserReviewsByFood from '../partials/UserReviewsByFood'

export default function Profile() {
  const { currentUser } = useContext(UserContext)
  const { username } = useParams()
  const profileUsername = username!
  const { user, loading: loadingUser, error: errorUser } = useUser({ username: profileUsername })

  return (
    <Spinner loading={loadingUser}>
      <Container>
        <Typography role='error-message-userData'>{errorUser ? `${errorUser}` : ''}</Typography>
        <Typography role='profile-name' variant='h3' component='h3'>
          @{profileUsername}
        </Typography>
        {currentUser!.username === profileUsername ? <EditProfile user={user} /> : ''}
        <Button variant='contained'>
          <Link aria-label='view-friends' to={`/${profileUsername}/friends`}>
            View Friends
          </Link>
        </Button>
        <Button variant='contained'>
          <Link aria-label='view-favorites' to={`/${profileUsername}/favorites`}>
            Favorite Dishes
          </Link>
        </Button>
        <Button variant='contained'>
          <Link aria-label='view-reviews' to={`/${profileUsername}/reviews`}>
            View all Reviews
          </Link>
        </Button>
        <UserReviewsByFood
          profileUsername={profileUsername}
          profileView={true}
          inputValue={'All'}
        />
      </Container>
    </Spinner>
  )
}
