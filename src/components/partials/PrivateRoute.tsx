import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext, UserContextType } from './UserContext'

const PrivateRoute = () => {
  const { currentUser } = useContext(UserContext) as UserContextType

  return (
    <>
      {currentUser ? (
        <Outlet context={{ username: currentUser.username }} />
      ) : (
        <Navigate to='/login' state={{ redirectTo: location.pathname }} />
      )}
    </>
  )
}

export default PrivateRoute
