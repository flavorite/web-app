import { createContext, useState } from 'react'
import { LoginPayload } from '../../client/flavorite/models'

export type UserContextType = {
  currentUser: LoginPayload | null
  setUser: (loginData: LoginPayload) => void
  clearUser: () => void
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setUser: () => undefined,
  clearUser: () => undefined,
})

const UserProvider = ({ children }: { children: React.ReactElement }) => {
  // User is the name of the "data" that gets stored in context
  const [currentUser, setCurrentUser] = useState<UserContextType['currentUser']>({
    username: 'kitty',
    token: 't',
  })

  // {
  //   username: 'kitty',
  //   token: 't',
  // }

  // Login updates the user data with a name parameter
  const setUser = (loginData: LoginPayload) => {
    setCurrentUser({
      username: loginData.username,
      token: loginData.token,
    })
  }

  // Logout updates the user data to default
  const clearUser = () => {
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider value={{ currentUser, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
