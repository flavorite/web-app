import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { User } from '../../client/flavorite/models'
import EditProfilePW from './EditProfilePW'

type profileProps = {
  user: User
}
export default function EditProfile({ user }: profileProps) {
  const [open, setOpen] = useState(false)
  //   const {
  //     mutate: updateUser,
  //     loading: loadingUpdateUser,
  //     error: errorUpdateUser,
  //   } = useUpdateUser({ username: user.username })
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    console.log('edit')
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogActions>
          <Button onClick={handleSubmit} autoFocus>
            Save Changes
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>Update your profile information:</DialogContentText>
          <TextField
            required
            autoFocus
            margin='dense'
            id='username'
            label='Username'
            type='username'
            defaultValue={user.username}
            fullWidth
            variant='standard'
          />
          <TextField
            required
            autoFocus
            margin='dense'
            id='firstName'
            label='First Name'
            type='firstName'
            defaultValue={user.firstName}
            fullWidth
            variant='standard'
          />
          <TextField
            required
            autoFocus
            margin='dense'
            id='lastName'
            label='Last Name'
            type='lastName'
            defaultValue={user.lastName}
            fullWidth
            variant='standard'
          />
          <TextField
            required
            autoFocus
            margin='dense'
            id='email'
            label='Email Address'
            type='email'
            defaultValue={user.email}
            fullWidth
            variant='standard'
          />
          <EditProfilePW />
        </DialogContent>
      </Dialog>
    </div>
  )
}
