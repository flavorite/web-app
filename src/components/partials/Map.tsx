import useRestaurants from '../../hooks/useRestaurants'
import * as Mui from '@mui/material';

export default function Map() {
  const {restaurants, loading, error} = useRestaurants({
    longitude: 32,
    latitude: -120,
    radius: 500
  })

  const restaurantsData = restaurants.map((restaurant, id) => {
    return (
      <div key={id}>
      {restaurant.name}
      </div>
    )
  })
  // use 'restaurantsData' to display custom markers on the map
  return <div>{restaurantsData}</div>
}
