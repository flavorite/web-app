import { useMutation, useQueryClient } from 'react-query'
import { UpdateFavoriteFoodsRequest, UsersApi } from '../client/flavorite/apis'
import { ListFavoriteFoods } from '../client/flavorite/models'

export default function useUpdateFavorites() {
  const queryClient = useQueryClient()
  const Users = new UsersApi()

  const updateFavoriteFoods = useMutation(
    (updateFavoritesData: UpdateFavoriteFoodsRequest) =>
      Users.updateFavoriteFoods(updateFavoritesData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      },
    },
  )

  const updatedFavorites: ListFavoriteFoods = {
    favoriteFoods: [
      { order: 1, name: 'sushi' },
      { order: 2, name: 'pizza' },
    ],
  }

  return {
    mutate: updateFavoriteFoods.mutate,
    // loading: newUser.isLoading,
    // error: newUser.isError,
    // success: newUser.isSuccess,
    // user: newUser.data
    loading: false,
    error: null,
    success: true,
    favorites: updatedFavorites.favoriteFoods,
  }
}
