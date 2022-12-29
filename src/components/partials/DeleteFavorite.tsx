import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { FavoriteFood } from '../../client/flavorite'
import useUpdateFavorites from '../../hooks/useUpdateFavorites'
import Spinner from './Spinner'

type deleteFavsProps = {
  favsList: FavoriteFood[]
  idx: number
  mouseIdx: string
  foodName: string
  setFavsList: (list: FavoriteFood[]) => void
  username: string
}

export default function DeleteFavorite({
  idx,
  mouseIdx,
  foodName,
  favsList,
  setFavsList,
  username,
}: deleteFavsProps) {
  const {
    loading: loadingUpdateFavorites,
    error: errorUpdateFavorites,
    mutate: updateFavorites,
  } = useUpdateFavorites()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    const newFavorites = favsList.filter((item, index) => index !== idx)
    newFavorites.forEach((item, index) => {
      item.id = index + 1
    })
    await updateFavorites({
      username: username,
      listFavoriteFoods: { favoriteFoods: newFavorites },
    })
    // TODO change this to either updatedFavs or getFavs when API is hooked
    setFavsList(newFavorites)
  }

  return (
    <Spinner loading={loadingUpdateFavorites}>
      <Box>
        <IconButton
          aria-label='delete'
          sx={{
            display: mouseIdx === `${idx}` ? 'inline-block' : 'none',
          }}
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              This will also delete all reviews you have posted for {foodName}. <br></br>Please
              click Delete if you want to proceed with deletion.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Typography role='error-message'>
          {/* TODO Style Typography */}
          {errorUpdateFavorites && `${errorUpdateFavorites}`}
        </Typography>
      </Box>
    </Spinner>
  )
}
