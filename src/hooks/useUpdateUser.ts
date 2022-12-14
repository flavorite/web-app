import { useMutation, useQueryClient } from 'react-query'
import { UpdateUserRequest, UsersApi } from '../client/flavorite/apis'
import { UpdateUser } from '../client/flavorite/models'

export default function useUpdateUser() {
  const queryClient = useQueryClient()
  const Users = new UsersApi()

  const updateUser = useMutation(
    (updateUserData: UpdateUserRequest) => Users.updateUser(updateUserData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      },
    },
  )

  const updatedUser: UpdateUser = {
    username: 'kitty',
    email: 'v@b.com',
    firstName: 'valerie',
    lastName: 'yang',
    password: 'testpw',
    friends: [],
    favoriteFoods: [],
  }

  return {
    mutate: updateUser.mutate,
    // loading: newUser.isLoading,
    // error: newUser.isError,
    // success: newUser.isSuccess,
    // user: newUser.data
    loading: false,
    error: null,
    success: true,
    user: updatedUser,
  }
}
