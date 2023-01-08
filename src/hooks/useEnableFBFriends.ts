import { useMutation, useQueryClient } from 'react-query'
import { UpdateFriendsRequest, UsersApi } from '../client/flavorite/apis'
import { ListFriends } from '../client/flavorite/models'

export default function useEnableFBFriends() {
  const queryClient = useQueryClient()
  const Users = new UsersApi()

  const enableFriends = useMutation(
    (updateFriendsData: UpdateFriendsRequest) => Users.updateFriends(updateFriendsData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      },
    },
  )

  const updatedFriends: ListFriends = {
    friends: [
      {
        id: '1',
        username: 'user1',
        firstName: 'friend',
        lastName: 'One',
        email: 'fone@g.com',
        password: 'hashed',
      },
      {
        id: '2',
        username: 'user2',
        firstName: 'friend2',
        lastName: 'Two',
        email: 'ftwo@g.com',
        password: 'hashedtwo',
      },
    ],
    fbConnected: true,
  }

  return {
    mutate: enableFriends.mutate,
    // loading: newUser.isLoading,
    // error: newUser.isError,
    // success: newUser.isSuccess,
    // user: newUser.data
    loading: false,
    error: null,
    success: true,
    friends: updatedFriends.friends,
    fbConnected: updatedFriends.fbConnected,
  }
}
