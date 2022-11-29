import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();


import Navbar from './components/partials/NavBar'
import Home from './components/pages/Home'
import Profile from './components/pages/Profile'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import FavoriteFoods from './components/pages/FavoriteFoods'
import FavoriteFood from './components/pages/FavoriteFood'
import Friends from './components/pages/Friends'
import UserReviews from './components/pages/UserReviews'
import NewReview from './components/pages/NewReview'

function App() {
  return (
    <div className='App'>
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
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/writeareview' element={<NewReview />} />
        </Routes>
      </Router>
            
    </QueryClientProvider>
    </div>
  )
}

export default App
