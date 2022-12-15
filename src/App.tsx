import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
const queryClient = new QueryClient()

import FavoriteFood from './components/pages/FavoriteFood'
import FavoriteFoods from './components/pages/FavoriteFoods'
import Friends from './components/pages/Friends'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import NewReviewForm from './components/pages/NewReviewForm'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Restaurant from './components/pages/Restaurant'
import UserReviews from './components/pages/UserReviews'
import Navbar from './components/partials/NavBar'

function App() {
  const theme = createTheme()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    // localStorage.clear()
    // localStorage.setItem('token', 'tokenString')
    if (localStorage.getItem('token') !== null) {
      // TODO: change this to username from the loginUser data payload once Cognito is set up
      setUsername('kitty')
    }
  }, [])

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <header>
              <Navbar username={username} />
            </header>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/:username' element={<Profile />} />
              <Route path='/:username/friends' element={<Friends />} />
              <Route path='/:username/reviews' element={<UserReviews />} />
              <Route path='/:username/favorites' element={<FavoriteFoods />} />
              <Route path='/:username/favorites/:favorite' element={<FavoriteFood />} />
              <Route path='/restaurants/:restaurantId' element={<Restaurant />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/writeareview/:restaurantName' element={<NewReviewForm />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
