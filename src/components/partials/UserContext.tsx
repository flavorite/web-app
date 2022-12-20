import { createContext, useState } from 'react'

type userType = {
  username: string
  auth: boolean
}

export type UserContextType = {
  user: userType
  login: (username: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | null>(null)

const UserProvider = ({ children }: { children: React.ReactElement }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState<userType>({ username: 'kitty', auth: false })

  // Login updates the user data with a name parameter
  const login = (username: string) => {
    setUser({
      username: username,
      auth: true,
    })
  }

  // Logout updates the user data to default
  const logout = () => {
    setUser({
      username: '',
      auth: false,
    })
  }

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
