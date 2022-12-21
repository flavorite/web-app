import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import AddFavorite from '../partials/AddFavorite'
import Spinner from '../partials/Spinner'

export default function FavoriteFoods() {
  const username = 'kitty'
  const { user, loading: loadingUserData, error: errorUserData } = useUser({ username })

  const favoritesList = user.favoriteFoods.map((food) => {
    return (
      <Link to={`/${username}/favorites/${food.name}`} key={food.order}>
        {food.name}
      </Link>
    )
  })

  return (
    <Spinner loading={loadingUserData}>
      <Container fixed>
        <AddFavorite username={user.username} favorites={user.favoriteFoods} />
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
