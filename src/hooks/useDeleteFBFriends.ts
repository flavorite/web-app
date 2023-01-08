import { useMutation, useQueryClient } from 'react-query'
import { DeleteFriendsRequest, UsersApi } from '../client/flavorite/apis'
import { ListFriends } from '../client/flavorite/models'

export default function useFBFriends() {
  const queryClient = useQueryClient()
  const Users = new UsersApi()

  const deleteFriends = useMutation(
    (DeleteFriendsData: DeleteFriendsRequest) => Users.deleteFriends(DeleteFriendsData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      },
    },
  )

  const deletedFriends: ListFriends = {
    friends: [],
    fbConnected: false,
  }

  return {
    mutate: deleteFriends.mutate,
    // loading: newUser.isLoading,
    // error: newUser.isError,
    // success: newUser.isSuccess,
    // user: newUser.data
    loading: false,
    error: null,
    success: true,
    friends: deletedFriends.friends,
    fbConnected: deletedFriends.fbConnected,
  }
}
