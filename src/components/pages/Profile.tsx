import { Link } from 'react-router-dom'

export default function Profile() {
  // only for route testing
  const username = 'testUser'
  return (
    <div>
      <h1>User Profile</h1>
      <Link to={`/${username}/friends`}>View Friends</Link>
      <Link to={`/${username}/favorites`}>Favorite Dishes</Link>
      <Link to={`/${username}/reviews`}>View all Reviews</Link>
    </div>
  )
}
