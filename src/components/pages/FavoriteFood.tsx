import * as Mui from '@mui/material'

export default function FavoriteFood() {
  // replace with favoritefoods from useUser
  const favorites = ['sushi', 'french fries', 'Bibimbap']
  return (
    <Mui.Container fixed>
      {/* user can switch views for different favorite by selecting from this autocomplete field */}
      <Mui.Autocomplete
        disablePortal
        options={favorites}
        sx={{ width: 300 }}
        renderInput={(params) => <Mui.TextField {...params} label='Favorite Dishes' />}
      />
      {/* List of Reviews selected Favorite Food and enable user to list them in favorite order */}
    </Mui.Container>
  )
}
