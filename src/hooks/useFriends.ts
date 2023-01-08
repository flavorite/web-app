import { GetFriendsRequest, UsersApi } from '../client/flavorite/apis'
import { ListFriends } from '../client/flavorite/models'

export default function useFavorites(username: GetFriendsRequest) {
  const Users = new UsersApi()
  //   const fetchFriends = () => Users.getFriends(username)
  //   const friendsList = useQuery(['user', username], fetchFriends)

  const friendsList: ListFriends = {
    friends: [],
    fbConnected: true,
  }

  return {
    // loading: userData.isLoading,
    // error: userData.isError,
    // user: userData.data
    loading: false,
    error: null,
    success: true,
    friends: friendsList.friends,
    fbConnected: friendsList.fbConnected,
  }
}
