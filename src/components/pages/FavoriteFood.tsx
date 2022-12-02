import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function FavoriteFood() {
  // replace with favoritefoods from useUser
  const favorites = ['sushi', 'french fries', 'Bibimbap']
  return (
    <Container fixed>
      {/* user can switch views for different favorite by selecting from this autocomplete field */}
      <Autocomplete
        disablePortal
        options={favorites}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Favorite Dishes' />}
      />
      {/* List of Reviews selected Favorite Food and enable user to list them in favorite order */}
    </Container>
  )
}
