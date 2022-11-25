import { Link } from 'react-router-dom'

export default function Navbar() {
  const username = 'testUser'
  return (
    <div>
      <nav>
        <Link to='/'>FlavoriteLogo</Link>
        {' | '}
        {/* need conditional to show different navbar when user is logged in vs logged out */}
        <Link to='/register'>Register</Link>
        {' | '}
        <Link to='/login'>Login</Link>
        {' | '}
        <Link to='/logout'>Logout</Link>
        {' | '}
        <Link to={`/${username}`}>Profile</Link>
      </nav>
    </div>
  )
}
