import Autocomplete from '@mui/material/Autocomplete'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'
import useFavorites from '../../hooks/useFavorites'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'
import UserReviewsByFood from '../partials/UserReviewsByFood'

export default function FavoriteFood() {
  const { currentUser } = useContext(UserContext)
  const username = currentUser!.username
  const {
    favorites,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useFavorites({ username: username })
  const [filter, setFilter] = useState<string[]>([])
  const [selected, setSelected] = useState<string>('')

  useEffect(() => {
    const optionsList = ['All']
    favorites.forEach((item) => {
      optionsList.push(item.name)
    })
    setFilter(optionsList)
  }, [])

  console.log(selected)

  return (
    <Spinner loading={loadingFavorites}>
      <Container fixed>
        <Typography role='error-message-userFavs'>
          {errorFavorites ? `${errorFavorites}` : ''}
        </Typography>
        <Autocomplete
          disablePortal
          options={filter}
          inputValue={selected}
          onInputChange={(event, newInputValue) => {
            setSelected(newInputValue)
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Favorite Dishes' />}
        />
        <UserReviewsByFood selected={selected} />
      </Container>
    </Spinner>
  )
}
