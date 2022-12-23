import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserContext } from './UserContext'

type privateProps = {
  children: React.ReactElement
}

const PrivateRoute: React.FC<privateProps> = ({ children }) => {
  const location = useLocation()
  const { currentUser } = useContext(UserContext)

  if (!currentUser) {
    return <Navigate to='/login' state={{ redirectTo: location.pathname }} />
  }

  return <>{<>{children}</>}</>
}

export default PrivateRoute
