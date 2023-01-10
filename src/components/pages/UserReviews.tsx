import Autocomplete from '@mui/material/Autocomplete'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useFavorites from '../../hooks/useFavorites'
import Spinner from '../partials/Spinner'
import UserReviewsByFood from '../partials/UserReviewsByFood'

export default function FavoriteFood() {
  const location = useLocation()
  const { username } = useParams()
  const profileUsername = username!
  const {
    favoriteNames,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useFavorites({ username: profileUsername })
  const [inputValue, setInputValue] = useState<string>('')
  const [value, setValue] = useState<string | null>('All')

  useEffect(() => {
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
          options={['All', ...favoriteNames]}
          value={value}
          onChange={(event, newValue: string | null) => {
            setValue(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          sx={{ width: 300, marginTop: 5 }}
          renderInput={(params) => <TextField {...params} label='Favorite Dishes' />}
          aria-label='selectFavs'
        />
        <UserReviewsByFood
          inputValue={inputValue}
          profileUsername={profileUsername}
          profileView={false}
        />
      </Container>
    </Spinner>
  )
}
