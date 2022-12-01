import Container from '@mui/material/Container'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export default function FavoriteFood() {
  // replace with favoritefoods from useUser 
  const favorites = ['sushi', 'french fries']
  return (
    <Container fixed>
      {/* user can switch views for different favorite by selecting from this autocomplete field */}
      <Autocomplete
        disablePortal
        options={favorites}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Favorite Dishes" />}
      />

    </Container>
  )
}
