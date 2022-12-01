import { Link } from 'react-router-dom'
import AddFavorite from '../partials/AddFavorite'
import * as Mui from '@mui/material'

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
    <Mui.Container fixed>
      <AddFavorite />
      <Mui.Stack spacing={2}>{favoritesList}</Mui.Stack>
      {/* Make into Ordered list, enable user to switch favorites order */}
    </Mui.Container>
  )
}
