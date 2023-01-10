import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Restaurant } from '../../client/flavorite/models'

type restaurantsProps = {
  restaurants: Restaurant[]
}

export default function RestaurantList({ restaurants }: restaurantsProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const displayRestaurants = restaurants
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((restaurant, id) => {
      return (
        <Stack aria-label='nearby-restaurants' key={id}>
          <Link
            aria-label={`restaurantDetail-${id}`}
            to={`/restaurants/${restaurant.name}`}
            state={{ restaurantId: restaurant.id }}
          >
            {/* TODO add more restaurant information after API spec change: Average rating, Number of starred reviews, Type of cusine? etc. */}
            {restaurant.name}
          </Link>
        </Stack>
      )
    })
  return (
    <Container fixed>
      <Typography>Nearby Restaurants:</Typography>
      <Box>
        {displayRestaurants}
        <TablePagination
          component='div'
          count={restaurants.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Box>
    </Container>
  )
}
