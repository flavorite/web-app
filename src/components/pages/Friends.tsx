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
import { ListFriends } from '../../client/flavorite/models'
import useDeleteFBFriends from '../../hooks/useDeleteFBFriends'
import useUpdateFriends from '../../hooks/useEnableFBFriends'
import useFriends from '../../hooks/useFriends'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'

export default function Friends() {
  const { currentUser } = useContext(UserContext)
  const username = currentUser!.username
  const [enabled, setEnabled] = useState<boolean>(false)
  const [friendsList, setFriendsList] = useState<ListFriends['friends']>([])
  const {
    friends,
    fbConnected,
    loading: loadingFriends,
    error: errorFetchingFriends,
  } = useFriends({ username: username })

  const {
    mutate: updateFriends,
    loading: loadingUpdateFriends,
    error: errorUpdateFriends,
    friends: updatedFriends,
    fbConnected: updatedFBconnected,
  } = useUpdateFriends()

  const {
    mutate: deleteFriends,
    loading: loadingDeleteFriends,
    error: errorDeleteFriends,
    friends: deletedFriends,
    fbConnected: deletedFBconnected,
  } = useDeleteFBFriends()

  useEffect(() => {
    if (fbConnected) {
      setEnabled(true)
      setFriendsList(friends)
    } else {
      setEnabled(false)
    }
  }, [])

  const displayFriends = friendsList.map((friend, id) => {
    return (
      <Link to={`/${friend.username}`} key={id}>
        {friend.username}
      </Link>
    )
  })

  const handleSync = async () => {
    await updateFriends({ username: username })
    setEnabled(updatedFBconnected!)
    setFriendsList(updatedFriends)
  }

  const handleToggle = async () => {
    if (enabled) {
      await deleteFriends({ username: username })
      setEnabled(deletedFBconnected!)
      setFriendsList(deletedFriends)
    } else {
      handleSync()
    }
    setEnabled(!enabled)
  }

  return (
    <Spinner loading={loadingFriends || loadingDeleteFriends || loadingUpdateFriends}>
      <Container fixed>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={enabled}
                onClick={handleToggle}
                inputProps={{ 'aria-label': 'Toggle Friends' }}
                name='toggleFriends'
              />
            }
            label={enabled ? 'FB Friends Connected' : 'Connect FB Friends'}
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
            {errorFetchingFriends ? `${errorFetchingFriends}` : ''}
          </Typography>
          <Typography role='error-message-updateFriends'>
            {errorUpdateFriends ? `${errorUpdateFriends}` : ''}
          </Typography>
          <Typography role='error-message-deleteFriends'>
            {errorDeleteFriends ? `${errorDeleteFriends}` : ''}
          </Typography>
          <Stack spacing={2}>{displayFriends}</Stack>
        </Box>
      </Container>
    </Spinner>
  )
}
