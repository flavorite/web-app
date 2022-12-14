import { GetUserByNameRequest, UsersApi } from '../client/flavorite/apis'
import { User } from '../client/flavorite/models'

export default function useUser(username: GetUserByNameRequest) {
  const Users = new UsersApi()
  //   const fetchUser = () => Users.getUserByName(username)
  //   const userData = useQuery(['user', username], fetchUser);

  const user: User = {
    id: '1',
    username: 'kitty',
    email: 'v@b.com',
    firstName: 'valerie',
    lastName: 'yang',
    password: 'testpw',
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
