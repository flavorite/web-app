import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'

export default function AddFavorite() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputForm = new FormData(event.currentTarget)
    const input = inputForm.get('favorite') as string
    console.log(input)
  }
  return (
    <Box component='form' onSubmit={handleSubmit}>
      <TextField
        required
        id='standard-basic'
        label='Add a new Favorite Dish'
        name='favorite'
        variant='standard'
      />
      <Fab color='primary' aria-label='add' role='button' type='submit'>
        <AddIcon />
      </Fab>
    </Box>
  )
}
