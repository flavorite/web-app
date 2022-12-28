import SyncIcon from '@mui/icons-material/Sync'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFriends from '../../hooks/useFriends'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'

export default function Friends() {
  const { currentUser } = useContext(UserContext)
  const username = currentUser!.username
  const [enabled, setEnabled] = useState<boolean>(false)
  const {
    friends,
    loading: loadingFriends,
    error: errorFetchingFriends,
  } = useFriends({ username: username })

  useEffect(() => {
    if (friends.length !== 0) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [])

  const friendsList = friends.map((friend, id) => {
    return (
      <Link to={`/${friend.username}`} key={id}>
        {friend.username}
      </Link>
    )
  })

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(event.target.checked)
    // TODO useUpdateFriends to enable/disable FB friends
  }

  const handleSync = () => {
    // TODO useUpdateFriends to sync FB friends to latest state
    console.log('sync')
  }

  return (
    <Spinner loading={loadingFriends}>
      <Container fixed>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={enabled}
                onChange={handleToggle}
                inputProps={{ 'aria-label': 'Toggle Friends' }}
                name='toggleFriends'
              />
            }
            label={enabled ? 'FB friends enabled' : 'Enable FB Friends'}
          />
        </FormGroup>
        {enabled ? (
          <Button variant='contained' endIcon={<SyncIcon />} onClick={handleSync}>
            Sync
          </Button>
        ) : (
          ''
        )}
        <Box>
          <Typography role='error-message-getFriends'>
            {errorFetchingFriends && `${errorFetchingFriends}`}
          </Typography>
          <Stack spacing={2}>{friendsList}</Stack>
        </Box>
      </Container>
    </Spinner>
  )
}
