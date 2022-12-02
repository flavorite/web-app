import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

export default function AddFavorite() {
  return (
    <Container>
      <TextField required id='standard-basic' label='Add a new Favorite Dish' variant='standard' />
      <Fab color='primary' aria-label='add'>
        <AddIcon />
      </Fab>
    </Container>
  )
}
