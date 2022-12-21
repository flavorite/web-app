import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useUpdateFavorites from '../../hooks/useUpdateFavorites'
import Spinner from './Spinner'

type favProps = {
  username: string
  favorites: { order: number; name: string }[]
}

export default function AddFavorite({ username, favorites }: favProps) {
  const {
    loading: loadingUpdateFavorites,
    error: errorUpdateFavorites,
    mutate: updateFavorites,
  } = useUpdateFavorites()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputForm = new FormData(event.currentTarget)
    const input = inputForm.get('favorite') as string
    const newFavorites = favorites
    newFavorites.push({ order: favorites.length + 1, name: input })
    await updateFavorites({
      username: username,
      listFavoriteFoods: { favoriteFoods: newFavorites },
    })
  }
  return (
    <Spinner loading={loadingUpdateFavorites}>
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
        <Typography role='error-message'>
          {/* TODO Style Typography */}
          {errorUpdateFavorites ? `${errorUpdateFavorites}` : ''}
        </Typography>
      </Box>
    </Spinner>
  )
}
