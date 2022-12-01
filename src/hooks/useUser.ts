import { User } from '../client/flavorite/models'
import Api from '../client/flavorite'
import { useQuery } from 'react-query'
import { GetUserByNameRequest } from '../client/flavorite/apis'

export default function useUser(username: GetUserByNameRequest) {
  // const fetchUser = Api.Users.getUserByName(username)
  // const userData = useQuery(['user', username], () => fetchUser);

  const user: User = {
    id: 1,
    username: 'kitty',
    email: 'v@b.com',
    firstName: 'valerie',
    lastName: 'yang',
    password: 'testpw',
    favoriteFoods: [],
    friends: [],
  }

  return {
    // loading: userData.isLoading,
    // error: userData.isError,
    // user: userData.data
    loading: false,
    error: null,
    user: user,
  }
}
