import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Navbar from './components/partials/NavBar'
import Home from './components/pages/Home'
import Profile from './components/pages/Profile'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import FavoriteFoods from './components/pages/FavoriteFoods'
import FavoriteFood from './components/pages/FavoriteFood'
import Friends from './components/pages/Friends'
import UserReviews from './components/pages/UserReviews'
import Restaurant from './components/pages/Restaurant'
import NewReviewForm from './components/pages/NewReviewForm'

function App() {
  const theme = createTheme()

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <header>
              <Navbar />
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
