import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import useUpdateUser from '../../hooks/useUpdateUser'
import { profileProps } from './EditProfile'
import Spinner from './Spinner'

export default function EditProfilePW({ user }: profileProps) {
  const [open, setOpen] = useState(false)
  const [pwForm, setPwForm] = useState({
    currentPW: '',
    newPW: '',
    newPWConfirm: '',
  })
  const [errorMsgPW, setErrorMsgPW] = useState('')
  const { mutate: updateUser, loading: loadingUpdateUser, error: errorUpdateUser } = useUpdateUser()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setErrorMsgPW('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwForm({ ...pwForm, [e.target.id]: e.target.value })
  }

  const handleSubmit = async () => {
    if (pwForm.currentPW !== user.password) {
      setErrorMsgPW('Current password provided does not match our records. Please try again')
    } else if (pwForm.newPW !== pwForm.newPWConfirm) {
      setErrorMsgPW('New password inputs do not match. Please try again')
    } else if (pwForm.newPW === '' && pwForm.newPWConfirm === '') {
      setErrorMsgPW('New password was not provided. Please try again')
    } else {
      // TODO need to refactor once Cognito is set up properly
      setErrorMsgPW('')
      await updateUser({
        username: user.username,
        updateUser: {
          password: pwForm.newPW,
        },
      })
      setOpen(false)
    }
  }

  return (
    <Spinner loading={loadingUpdateUser}>
      <Box>
        <Typography role='error-message-updateUser'>
          {/* TODO Style Typography */}
          {errorUpdateUser ? `${errorUpdateUser}` : ''}
        </Typography>
        <Button variant='outlined' onClick={handleClickOpen} aria-label='editprofile-changepw'>
          Change Password
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Change Password</DialogTitle>
          <Typography role='error-message-pwcheck'>
            {/* TODO Style Typography */}
            {errorMsgPW}
          </Typography>
          <DialogContent>
            <DialogContentText aria-label='changepw-dialog'>
              Enter your current password and new password:
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='currentPW'
              label='Current Password'
              type='password'
              fullWidth
              variant='standard'
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin='dense'
              id='newPW'
              label='New Password'
              type='password'
              fullWidth
              variant='standard'
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin='dense'
              id='newPWConfirm'
              label='Confirm New Password'
              type='password'
              fullWidth
              variant='standard'
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} aria-label='changepw-cancel'>
              Cancel
            </Button>
            <Button onClick={handleSubmit} aria-label='changepw-submit'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Spinner>
  )
}
