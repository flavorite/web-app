import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext, UserContextType } from './UserContext'

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const location = useLocation()
  const { user } = useContext(UserContext) as UserContextType

  return (
    <>
      {!user.auth ? (
        <Navigate to='/login' state={{ from: location, message: 'Please login to continue' }} />
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default PrivateRoute
