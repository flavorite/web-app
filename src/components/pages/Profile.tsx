import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import * as Mui from '@mui/material'

export default function Profile() {
  // only for route testing
  const username = 'kitty'
  const { user, loading, error } = useUser({ username })
  return (
    <Mui.Container>
      <Mui.Typography variant="h3" component="h3">
        @{user.username}
      </Mui.Typography>
      <Mui.Button variant="contained"><Link to={`/${username}/friends`}>View Friends</Link></Mui.Button>
      <Mui.Button variant="contained"><Link to={`/${username}/favorites`}>Favorite Dishes</Link></Mui.Button>
      <Mui.Button variant="contained"><Link to={`/${username}/reviews`}>View all Reviews</Link></Mui.Button>
      {/* Need to add Edit Profile , and User's recent reviews below Profile options */}
    </Mui.Container>
  )
}
