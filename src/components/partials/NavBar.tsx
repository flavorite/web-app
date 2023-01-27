import AccountBoxIcon from '@mui/icons-material/AccountBox'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from './UserContext'

export default function Navbar() {
  const { currentUser, clearUser } = useContext(UserContext)
  const settings = ['Profile', 'Find Friends', 'Logout']
  const pages = ['Login', 'Register']
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (e: any) => {
    setAnchorElNav(null)
    if (e.target.textContent === 'Login') {
      navigate('/login')
    } else if (e.target.textContent === 'Register') {
      navigate('/register')
    }
  }

  const handleCloseUserMenu = (e: any) => {
    setAnchorElUser(null)
    if (e.target.textContent === 'Profile') {
      navigate(`/${currentUser!.username}`)
    } else if (e.target.textContent === 'Logout') {
      clearUser()
    } else if (e.target.textContent === 'Find Friends') {
      navigate(`/${currentUser!.username}/friends`)
    }
  }

  return (
    <AppBar position='static' sx={{ backgroundColor: 'rgb(123,178,190)' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box
            component='img'
            sx={{
              height: 70,
              display: { xs: 'none', md: 'flex' },
            }}
            alt='Flavorite Logo'
            src='/Flavorite-logos_transparent.png'
            onClick={() => navigate('/')}
          />

          <Box sx={{ flexGrow: 1, display: currentUser ? 'none' : { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='loggedOutMenu xs'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: currentUser ? 'none' : { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component='img'
            sx={{
              display: { xs: 'flex', md: 'none' },
              height: 70,
              flexGrow: 1,
            }}
            alt='Flavorite Logo'
            src='/Flavorite-logos_transparent.png'
            onClick={() => navigate('/')}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box aria-label='loggedOutMenu md' style={{ display: currentUser ? 'none' : '' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'inline' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>

          <Box
            sx={{ flexGrow: 0 }}
            style={{ display: currentUser ? 'flex' : 'none' }}
            aria-label='user options'
          >
            <Tooltip title='Your Account'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountBoxIcon sx={{ color: 'rgb(247,246,233)' }} fontSize='large' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
