import * as Mui from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export default function AddFavorite() {
  return (
    <Mui.Container>
      <Mui.TextField required id="standard-basic" label="Add a new Favorite Dish" variant="standard" />
      <Mui.Fab color="primary" aria-label="add">
  <AddIcon />
</Mui.Fab>
    </Mui.Container>
  )
}
