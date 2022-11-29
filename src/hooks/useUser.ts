import { User } from '../../client/flavorite'


export default function useUser(username: string) {
    const user: User =
    {
        id: 1,
        username: 'kitty',
        email: 'v@b.com',
        firstName: 'valerie',
        lastName: 'yang',
        password: 'testpw',
        favoriteFoods: [],
        friends: []

    }

    return {
        loading: false,
        error: null,
        user: user
    }


}
