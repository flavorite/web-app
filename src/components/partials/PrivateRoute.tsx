import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserContext, UserContextType } from './UserContext'

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const location = useLocation()
  const { user } = useContext(UserContext) as UserContextType

  return (
    <>
      {!user.auth ? (
        <Navigate to='/login' state={{ redirectTo: location.pathname }} />
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default PrivateRoute
