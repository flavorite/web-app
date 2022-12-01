import * as Mui from '@mui/material'
import { Link } from 'react-router-dom'

export default function Friends() {
  // replace with 'Friends' objects from useUser()
  const friends = ['Jake', 'Jason', 'Jamie']

  const friendsList = friends.map((friend, id) => {
    return (
      <Link to={`/${friend}`} key={id}>
        {friend}
      </Link>
    )
  })

  return (
    <Mui.Container fixed>
      {/* Enable user to connect to FB friends if not done yet */}
      <Mui.Stack spacing={2}>{friendsList}</Mui.Stack>
    </Mui.Container>
  )
}
