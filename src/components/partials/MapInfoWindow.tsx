import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import { Restaurant } from '../../client/flavorite/models'

type infoWindowProps = {
  restaurants: Restaurant[]
  coords: { lat: number; lng: number }
}

export default function MapInfoWindow({ restaurants, coords }: infoWindowProps) {
  const displayInfoWindow = restaurants
    .filter(
      (restaurant) => restaurant.latitude === coords.lat && restaurant.longitude === coords.lng,
    )
    .map((restaurant, idx) => {
      return (
        <Stack aria-label='restaurants-infoWindow' key={idx}>
          <Link
            aria-label={`restaurantDetail-${restaurant.id}`}
            to={`/restaurants/${restaurant.name}`}
            state={{ restaurantId: restaurant.id }}
          >
            {/* TODO add more restaurant information after API spec change: Average rating, Number of starred reviews, Type of cusine? etc. */}
            {restaurant.name}
          </Link>
        </Stack>
      )
    })

  return <Box>{displayInfoWindow}</Box>
}
