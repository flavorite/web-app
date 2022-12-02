import { ListRestaurants } from '../client/flavorite/models'
import { useQuery } from 'react-query'
import { GetRestaurantsRequest, RestaurantsApi } from '../client/flavorite/apis'

export default function useRestaurants(location: GetRestaurantsRequest) {
  const Restaurants = new RestaurantsApi()
  const fetchRestaurants = Restaurants.getRestaurants(location)
  const restaurants = useQuery(['restaurants', location], () => fetchRestaurants)

  const restaurantsList: ListRestaurants = {
    restaurants: [
      {
        id: 1,
        name: 'Kansai Sushi',
        longitude: 37.9729811,
        latitude: -122.0455746,
        address: '1669 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: 2,
        name: 'Tang Tang Tang',
        longitude: 37.9736553,
        latitude: -122.0443956,
        address: '1679 Willow Pass Rd, Concord, CA 94520',
      },
    ],
  }

  return {
    // loading: Reviews.isLoading,
    // error: Reviews.isError,
    // user: Reviews.data
    loading: false,
    error: null,
    restaurants: restaurantsList.restaurants,
  }
}
