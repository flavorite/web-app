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
  // const initialSelection = location.state ? location.state.foodName : ''
  const {
    favorites,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useFavorites({ username: username })
  const [filter, setFilter] = useState<string[]>(['All'])
  const [inputValue, setInputValue] = useState<string>('')
  const [value, setValue] = useState<string | null>(filter[0])

  useEffect(() => {
    const optionsList = Array.from(filter)
    favorites.forEach((item) => {
      optionsList.push(item.name)
    })
    setFilter(optionsList)

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
          options={filter}
          value={value}
          onChange={(event: any, newValue: string | null) => {
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
