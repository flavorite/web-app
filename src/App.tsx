import { createTheme, ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
const queryClient = new QueryClient()

import FavoriteFoods from './components/pages/FavoriteFoods'
import Friends from './components/pages/Friends'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import NewReviewForm from './components/pages/NewReviewForm'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Restaurant from './components/pages/Restaurant'
import Navbar from './components/partials/NavBar'
import PrivateRoute from './components/partials/PrivateRoute'
import { UserProvider } from './components/partials/UserContext'
import UserReviews from './components/partials/UserReviewsByFood'

function App() {
  const theme = createTheme()

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Router>
              <header>
                <Navbar />
              </header>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route
                  path='/:username'
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/:username/friends'
                  element={
                    <PrivateRoute>
                      <Friends />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/:username/reviews'
                  element={
                    <PrivateRoute>
                      <UserReviews />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/:username/favorites'
                  element={
                    <PrivateRoute>
                      <FavoriteFoods />
                    </PrivateRoute>
                  }
                />
                {/* <Route
                  path='/:username/reviews/:favorite'
                  element={
                    <PrivateRoute>
                      <UserReviews />
                    </PrivateRoute>
                  }
                /> */}
                <Route path='/restaurants/:restaurantId' element={<Restaurant />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route
                  path='/writeareview/:restaurantName'
                  element={
                    <PrivateRoute>
                      <NewReviewForm />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Router>
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
