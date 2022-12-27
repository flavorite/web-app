import Autocomplete from '@mui/material/Autocomplete'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useFavorites from '../../hooks/useFavorites'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'
import UserReviewsByFood from '../partials/UserReviewsByFood'

export default function FavoriteFood() {
  const location = useLocation()
  const { currentUser } = useContext(UserContext)
  const username = currentUser!.username
  const {
    favorites,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useFavorites({ username: username })
  const [options, setOptions] = useState<string[]>(['All'])
  const [inputValue, setInputValue] = useState<string>('')
  const [value, setValue] = useState<string | null>(options[0])

  useEffect(() => {
    favorites.forEach((item) => {
      setOptions((prevOptions) => [...prevOptions, item.name])
    })

    if (location.state) {
      setValue(location.state.foodName)
    }
  }, [])

  return (
    <Spinner loading={loadingFavorites}>
      <Container fixed>
        <Typography role='error-message-userFavs'>
          {errorFavorites ? `${errorFavorites}` : ''}
        </Typography>
        <Autocomplete
          disablePortal
          options={options}
          value={value}
          onChange={(event, newValue: string | null) => {
            setValue(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Favorite Dishes' />}
        />
        <UserReviewsByFood inputValue={inputValue} />
      </Container>
    </Spinner>
  )
}
