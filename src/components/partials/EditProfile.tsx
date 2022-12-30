import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { UpdateUser, User } from '../../client/flavorite/models'
import useUpdateUser from '../../hooks/useUpdateUser'
import EditProfilePW from './EditProfilePW'
import Spinner from './Spinner'

export type profileProps = {
  user: User
}
export default function EditProfile({ user }: profileProps) {
  const [open, setOpen] = useState(false)
  const [updateUserData, setUpdateUserData] = useState<UpdateUser>({})
  const { mutate: updateUser, loading: loadingUpdateUser, error: errorUpdateUser } = useUpdateUser()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    setOpen(false)
    if (Object.entries(updateUserData).length > 0) {
      await updateUser({
        username: user.username,
        updateUser: updateUserData,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserData({ ...updateUserData, [e.target.id]: e.target.value })
  }

  return (
    <Spinner loading={loadingUpdateUser}>
      <Container>
        <Button variant='outlined' onClick={handleClickOpen} aria-label='editprofile-button'>
          Edit Profile
        </Button>
        <Typography role='error-message-updateUser'>
          {/* TODO Style Typography */}
          {errorUpdateUser ? `${errorUpdateUser}` : ''}
        </Typography>
        <Dialog fullScreen open={open} onClose={handleClose}>
          <DialogTitle aria-label='editprofile-dialog'>Edit Profile</DialogTitle>
          <DialogActions>
            <Button onClick={handleSubmit} aria-label='editprofile-submit' autoFocus>
              Save Changes
            </Button>
            <Button onClick={handleClose} aria-label='editprofile-cancel'>
              Cancel
            </Button>
          </DialogActions>
          <DialogContent>
            <DialogContentText>Update your profile information:</DialogContentText>
            <TextField
              required
              autoFocus
              margin='dense'
              id='username'
              label='Username'
              aria-label='username'
              defaultValue={user.username}
              fullWidth
              variant='standard'
              onChange={handleChange}
            />
            <TextField
              required
              autoFocus
              margin='dense'
              id='firstName'
              label='First Name'
              aria-label='firstName'
              defaultValue={user.firstName}
              fullWidth
              variant='standard'
              onChange={handleChange}
            />
            <TextField
              required
              autoFocus
              margin='dense'
              id='lastName'
              label='Last Name'
              aria-label='lastName'
              defaultValue={user.lastName}
              fullWidth
              variant='standard'
              onChange={handleChange}
            />
            <TextField
              required
              autoFocus
              margin='dense'
              id='email'
              label='Email Address'
              aria-label='email'
              defaultValue={user.email}
              fullWidth
              variant='standard'
              onChange={handleChange}
            />
            <EditProfilePW user={user} />
          </DialogContent>
        </Dialog>
      </Container>
    </Spinner>
  )
}
