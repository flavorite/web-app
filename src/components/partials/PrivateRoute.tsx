import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserContext, UserContextType } from './UserContext'

type privateProps = {
  children: React.ReactElement
}

const PrivateRoute: React.FC<privateProps> = ({ children }) => {
  const location = useLocation()
  const { currentUser } = useContext(UserContext) as UserContextType

  return (
    <>
      {currentUser ? (
        <>{children}</>
      ) : (
        <Navigate to='/login' state={{ redirectTo: location.pathname }} />
      )}
    </>
  )
}

export default PrivateRoute
