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
      {
        id: '3',
        name: 'Ohgane Korean BBQ',
        latitude: 37.9730366,
        longitude: -122.0454687,
        address: '1671 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '4',
        name: 'Kevin\'s Noddle House',
        latitude: 37.9414343,
        longitude: -122.086756,
        address: '1833 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '5',
        name: 'Mr.Lee\'s Chicken',
        latitude: 37.9726787,
        longitude: -122.0484015,
        address: '1651 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '6',
        name: 'Waikiki Hawaiian BBQ',
        latitude: 37.9723669,
        longitude: -122.0438169,
        address: '1680 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '7',
        name: '85C Bakery',
        latitude: 37.9736109,
        longitude: -122.0441615,
        address: '1691 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '8',
        name: 'Fresh Box',
        latitude: 37.8974296,
        longitude: -122.1243279,
        address: '1679 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '9',
        name: 'MochiNut',
        latitude: 37.9728629,
        longitude: -122.0466354,
        address: '1645 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '10',
        name: 'Korea House',
        latitude: 37.9749825,
        longitude: -122.0409984,
        address: '1835 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '11',
        name: 'Tasty Pot',
        latitude: 37.9210411,
        longitude: -122.2946556,
        address: '1683 Willow Pass Rd, Concord, CA 94520',
      },
      {
        id: '12',
        name: 'Boba Loca',
        latitude: 37.9751347,
        longitude: -122.0429141,
        address: '1843 Willow Pass Rd, Concord, CA 94520',
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
