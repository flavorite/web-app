import { Link } from 'react-router-dom'
import AddFavorite from '../partials/AddFavorite'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

export default function FavoriteFoods() {
  // replace with 'favoritefoods' from useUser()
  const favorites = ['sushi', 'french fries', 'bibimbap']
  const username = 'testUser'

  const favoritesList = favorites.map((food, idx) => {
    return (
      <Link to={`/${username}/favorites/${food}`} key={idx}>
        {food}
      </Link>
    )
  })

  return (
    <Container fixed>
      <AddFavorite />
      <Stack spacing={2}>{favoritesList}</Stack>
      {/* Make into Ordered list, enable user to switch favorites order */}
    </Container>
  )
}
