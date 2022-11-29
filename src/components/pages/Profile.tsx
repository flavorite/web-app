import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'


export default function Profile() {
  // only for route testing
  const username = 'kitty'
  const {user, loading, error} = useUser({username})
  return (
    <div>
      <h1>{user.username}Profile</h1>
      <h1>{user.firstName}Profile</h1>
      <Link to={`/${username}/friends`}>View Friends</Link>
      <Link to={`/${username}/favorites`}>Favorite Dishes</Link>
      <Link to={`/${username}/reviews`}>View all Reviews</Link>
    </div>
  )
}
