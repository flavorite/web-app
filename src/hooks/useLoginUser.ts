import { useMutation, useQueryClient } from 'react-query'
import { LoginUserRequest, UsersApi } from '../client/flavorite/apis'
import { LoginPayload } from '../client/flavorite/models'

export default function useLoginUser() {
  const queryClient = useQueryClient()
  const Users = new UsersApi()

  const loginUser = useMutation((loginData: LoginUserRequest) => Users.loginUser(loginData), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
    },
  })

  const loggedInUser: LoginPayload = {
    username: 'kitty',
    token: 'tokenString'
  }

  return {
    mutate: loginUser.mutate,
    // loading: newUser.isLoading,
    // error: newUser.isError,
    // success: newUser.isSuccess,
    // user: newUser.data
    loading: false,
    error: null,
    success: true,
    user: loggedInUser,
  }
}
