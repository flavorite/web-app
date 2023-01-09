import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { Restaurant } from '../../client/flavorite/models'

type restaurantsProps = {
  restaurants: Restaurant[]
}

export default function RestaurantList({ restaurants }: restaurantsProps) {
  const displayRestaurants = restaurants.map((restaurant, id) => {
    return (
      // TODO add Pagination
      <Stack key={id}>
        <Link to={`/restaurants/${restaurant.name}`} state={{ restaurantId: restaurant.id }}>
          {restaurant.name}
        </Link>
      </Stack>
    )
  })
  return (
    <Container fixed>
      <Typography>Nearby Restaurants:</Typography>
      <Box>{displayRestaurants}</Box>
    </Container>
  )
}
