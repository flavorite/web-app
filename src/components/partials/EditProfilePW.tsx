import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

export default function EditProfilePW() {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your current password and new password:</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='currentPW'
            label='Current Password'
            type='password'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='newPW'
            label='New Password'
            type='password'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='newPW'
            label='Confirm New Password'
            type='password'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
