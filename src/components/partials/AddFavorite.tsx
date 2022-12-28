import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import useUpdateFavorites from '../../hooks/useUpdateFavorites'
import Spinner from './Spinner'

type favProps = {
  username: string
  favorites: { id: number; name: string }[]
}

export default function AddFavorite({ username, favorites }: favProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const {
    loading: loadingUpdateFavorites,
    error: errorUpdateFavorites,
    mutate: updateFavorites,
  } = useUpdateFavorites()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newFavorites = favorites
    newFavorites.push({ id: favorites.length + 1, name: inputValue })
    await updateFavorites({
      username: username,
      listFavoriteFoods: { favoriteFoods: newFavorites },
    })
    setInputValue('')
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Fab color='primary' aria-label='add' role='button' type='submit'>
          <AddIcon />
        </Fab>
        <Typography role='error-message'>
          {/* TODO Style Typography */}
          {errorUpdateFavorites && `${errorUpdateFavorites}`}
        </Typography>
      </Box>
    </Spinner>
  )
}
