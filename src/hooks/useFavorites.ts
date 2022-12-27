import { GetFavoriteFoodsRequest, UsersApi } from '../client/flavorite/apis'
import { ListFavoriteFoods } from '../client/flavorite/models'

export default function useFavorites(username: GetFavoriteFoodsRequest) {
  const Users = new UsersApi()
  //   const fetchFavorites = () => Users.getFavoriteFoods(username)
  //   const favoriteFoodsList = useQuery(['user', username], fetchFavorites)

  const favorites: ListFavoriteFoods = {
    favoriteFoods: [
      { id: 1, name: 'sushi' },
      { id: 2, name: 'pizza' },
    ],
  }

  const favoriteNames = favorites.favoriteFoods.map((food) => {
    return food.name
  })


  return {
    // loading: userData.isLoading,
    // error: userData.isError,
    // user: userData.data
    loading: false,
    error: null,
    success: true,
    favorites: favorites.favoriteFoods,
    favoriteNames: favoriteNames,
  }
}
