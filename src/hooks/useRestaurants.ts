import { GetRestaurantsRequest, RestaurantsApi } from '../client/flavorite/apis'
import { ListRestaurants } from '../client/flavorite/models'

export default function useRestaurants(location: GetRestaurantsRequest) {
  const Restaurants = new RestaurantsApi()
  //   const fetchRestaurants = () => Restaurants.getRestaurants(location)
  //   const restaurants = useQuery(['restaurants', location],fetchRestaurants)

  const restaurantsList: ListRestaurants = {
    restaurants: [
      {
        id: '1',
        name: 'Kansai Sushi',
        latitude: 37.972981,
        longitude: -122.0476131,

        address: '1669 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '2',
        name: 'Tang Tang Tang',
        latitude: 37.8974296,
        longitude: -122.1243279,
        address: '1679 Willow Pass Rd, Concord, CA 94520',
      },
    ],
  }

  return {
    // loading: restaurants.isLoading,
    // error: restaurants.isError,
    // restaurants: restaurants.data
    loading: false,
    error: null,
    restaurants: restaurantsList.restaurants,
  }
}
