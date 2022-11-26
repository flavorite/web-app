import { Link } from 'react-router-dom'
import AddFavorite from '../partials/AddFavorite'

export default function FavoriteFoods() {
  const username = 'testUser'
  const favoriteName = 'sushi'
  return (
    <div>
      <AddFavorite />
      <h1>Mapped List of Favorite Dishes in order for this user</h1>
      <Link to={`/${username}/favorites/${favoriteName}`}>{favoriteName}</Link>
    </div>
  )
}
