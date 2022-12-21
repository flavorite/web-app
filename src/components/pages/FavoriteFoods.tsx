import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import AddFavorite from '../partials/AddFavorite'
import Spinner from '../partials/Spinner'
import { UserContext, UserContextType } from '../partials/UserContext'

export default function FavoriteFoods() {
  const { user: currentUser } = useContext(UserContext) as UserContextType
  const username = currentUser.username
  const { user: userData, loading: loadingUserData, error: errorUserData } = useUser({ username })

  const favoritesList = userData.favoriteFoods.map((food) => {
    return (
      <Box key={food.order}>
        <Typography>
          {food.order}.<Link to={`/${username}/favorites/${food.name}`}>{food.name}</Link>
        </Typography>
      </Box>
    )
  })

  return (
    <Spinner loading={loadingUserData}>
      <Container fixed>
        <AddFavorite username={username} favorites={userData.favoriteFoods} />
        <Typography role='error-message'>
          {/* TODO Style Typography */}
          {errorUserData ? `${errorUserData}` : ''}
        </Typography>
        <Stack spacing={2}>{favoritesList}</Stack>
        {/* TODO: Make into Ordered list, enable user to switch favorites order */}
      </Container>
    </Spinner>
  )
}
