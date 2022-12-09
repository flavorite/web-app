import { useMutation, useQueryClient } from 'react-query'
import { CreateUserRequest, UsersApi } from '../client/flavorite/apis'
import { CreateUser } from '../client/flavorite/models'

export default function useCreateUser() {
  const queryClient = useQueryClient()
  const Users = new UsersApi()

  const newUser = useMutation((newUserData: CreateUserRequest) => Users.createUser(newUserData), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
    },
  })

  const user: CreateUser = {
    username: 'kitty',
    email: 'v@b.com',
    firstName: 'valerie',
    lastName: 'yang',
    password: 'testpw',
  }

  return {
    mutate: newUser.mutate,
    // loading: newUser.isLoading,
    // error: newUser.isError,
    // success: newUser.isSuccess,
    // user: newUser.data
    loading: false,
    error: null,
    success: false,
    user: user
  }
}
