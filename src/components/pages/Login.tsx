import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as Mui from '@mui/material'

function Copyright(props: any) {
  return (
    <Mui.Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Flavorite
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Mui.Typography>
  )
}

const theme = createTheme()

export default function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Mui.Container component='main' maxWidth='xs'>
        <Mui.CssBaseline />
        <Mui.Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Mui.Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Mui.Avatar>
          <Mui.Typography component='h1' variant='h5'>
            Sign in
          </Mui.Typography>
          <Mui.Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Mui.TextField
              margin='normal'
              required
              fullWidth
              id='emailOrUsername'
              label='Email or Username'
              name='emailOrUsername'
              autoComplete='emailOrUsername'
              autoFocus
            />
            <Mui.TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Mui.FormControlLabel
              control={<Mui.Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Mui.Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Mui.Button>
            <Mui.Grid container>
              <Mui.Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Mui.Grid>
              <Mui.Grid item>
                <Link href='/register' variant='body2'>
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Box>
        </Mui.Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Mui.Container>
    </ThemeProvider>
  )
}
