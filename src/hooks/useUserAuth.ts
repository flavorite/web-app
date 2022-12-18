import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export const userAuth = () => {
  const [username, setUsername] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('token', 'setToken')
    const token = localStorage.getItem('token')
    // TODO finish writing logic once Cognito is connected
    if (token !== null) {
      setUsername('kitty')
    } else {
      setUsername(null)
    }
  }, [username])

  const logOut = () => {
    localStorage.removeItem('token')
    setUsername(null)

    navigate('/login')
  }

  return {
    username: username,
    logOut: logOut,
  }
}
