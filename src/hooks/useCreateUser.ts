import { useMutation, useQueryClient } from 'react-query';
import  Api from '../client/flavorite'
import { CreateUserRequest } from '../client/flavorite/apis';
import { CreateUser} from '../client/flavorite/models'

export default function useCreateUser() {

    const queryClient = useQueryClient();

    const newUser = useMutation((newUserData: CreateUserRequest) => Api.Users.createUser(newUserData), {
        onSuccess: () => {
            queryClient.invalidateQueries('user')
          },
    })


    const user: CreateUser =
    {
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
        success: true,
        user: user
    }
}
