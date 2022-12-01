import MenuIcon from '@mui/icons-material/Menu'
import * as Mui from '@mui/material'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const settings = ['Profile', 'Find Friends', 'Logout']

export default function Navbar() {
  const navigate = useNavigate()
  // test user
  const [username, setUsername] = useState<null | string>('testUser')
  const [pages, setPages] = useState<string[]>([''])
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  useEffect(() => {
    // set currentUser's username here
    if (username) {
      setPages(['Write a Review'])
    } else {
      setPages(['Login', 'Register'])
    }
  }, [username])

  const handleCloseNavMenu = (e: any) => {
    if (e.target.textContent === 'Login') {
      navigate('/login')
    } else if (e.target.textContent === 'Register') {
      navigate('/register')
    } else if (e.target.textContent === 'Write a Review') {
      navigate('/writeareview')
    }
  }

  const handleCloseUserMenu = (e: any) => {
    setAnchorElUser(null)
    if (e.target.textContent === 'Profile') {
      navigate(`/${username}`)
    } else if (e.target.textContent === 'Logout') {
      // handleLogout function (prop) here
      navigate('/login')
    } else if (e.target.textContent === 'Find Friends') {
      navigate(`/${username}/friends`)
    }
  }

  return (
    <Mui.AppBar position='static'>
      <Mui.Container maxWidth='xl'>
        <Mui.Toolbar disableGutters>
          <Mui.Typography
            onClick={() => navigate('/')}
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Flavorite
          </Mui.Typography>

          <Mui.Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Mui.IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </Mui.IconButton>
            <Mui.Menu
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Mui.MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Mui.Typography textAlign='center'>{page}</Mui.Typography>
                </Mui.MenuItem>
              ))}
            </Mui.Menu>
          </Mui.Box>

          <Mui.Typography
            onClick={() => navigate('/')}
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Flavorite
          </Mui.Typography>
          <Mui.Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Mui.Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Mui.Button>
            ))}
          </Mui.Box>

          <Mui.Box style={{ display: username ? 'block' : 'none' }} sx={{ flexGrow: 0 }}>
            <Mui.Tooltip title='Open settings'>
              <Mui.IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Mui.Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </Mui.IconButton>
            </Mui.Tooltip>
            <Mui.Menu
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
                <Mui.MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Mui.Typography textAlign='center'>{setting}</Mui.Typography>
                </Mui.MenuItem>
              ))}
            </Mui.Menu>
          </Mui.Box>
        </Mui.Toolbar>
      </Mui.Container>
    </Mui.AppBar>
  )
}
