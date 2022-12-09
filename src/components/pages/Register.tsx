import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import useCreateUser from '../../hooks/useCreateUser'
import { CreateUser } from '../../client/flavorite/models'
import { useNavigate } from 'react-router'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react'
import Spinner from '../partials/Spinner'

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Register() {
  const navigate = useNavigate()
  const mutation = useCreateUser()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  useEffect (() => {
    if (mutation.success) {
      navigate('/login')
    }

    if (mutation.error) {
      // TODO need to refactor to display error message from mutation.error
      setErrorMsg(mutation.error)
    } else {
      setErrorMsg(null)
    }

    if (mutation.loading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }

  },[mutation.success, mutation.loading, mutation.error]) 


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const formDataObj: CreateUser = {
      username: formData.get('username') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    // TODO revive when API is connected
    await mutation.mutate({ createUser: formDataObj })


  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      {isLoading ? <Spinner loading={isLoading} /> : null}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Typography>
          {/* TODO Style Typography */}
          {errorMsg ? `${errorMsg}` : ''}
        </Typography>
        <Box component='form' data-testid='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                inputProps={{ 'data-testid': 'required-firstName' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
                inputProps={{ 'data-testid': 'required-lastName' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                inputProps={{ 'data-testid': 'required-email' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                inputProps={{ 'data-testid': 'required-username' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                inputProps={{ 'data-testid': 'required-password' }}
              />
            </Grid>
          </Grid>
          <Button role='button' type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
