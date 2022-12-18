import { Navigate, useLocation } from 'react-router-dom'
import { userAuth } from '../../hooks/useUserAuth'

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const location = useLocation()
  const { username } = userAuth()

  return (
    <>
      {!username ? (
        <Navigate to='/login' state={{ from: location, message: 'Please login to continue' }} />
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default PrivateRoute
