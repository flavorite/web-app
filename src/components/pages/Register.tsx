import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useCreateUser from '../../hooks/useCreateUser'
import {useState} from 'react'
import { CreateUser } from '../../client/flavorite/models'
import { useNavigate } from 'react-router'
import * as Mui from '@mui/material';

function Copyright(props: any) {
  return (
    <Mui.Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Mui.Typography>
  )
}

const theme = createTheme()

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateUser>({
    username: '',
    firstName:'',
    lastName:'',
    email:'',
    password:''
  })
  const mutation = useCreateUser()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formDataObj: any = {}
    formData.forEach((value, key) => (formDataObj[key] = value));
    setForm({
      username: formDataObj.username,
      firstName:formDataObj.firstName,
      lastName:formDataObj.lastName,
      email:formDataObj.email,
      password:formDataObj.password
    })
    const createUser = () => mutation.mutate({createUser: form})
    navigate('/')
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
            Sign up
          </Mui.Typography>
          <Mui.Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Mui.Grid container spacing={2}>
              <Mui.Grid item xs={12} sm={6}>
                <Mui.TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Mui.Grid>
              <Mui.Grid item xs={12} sm={6}>
                <Mui.TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                />
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.TextField
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                />
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Mui.Grid>
            </Mui.Grid>
            <Mui.Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Mui.Button>
            <Mui.Grid container justifyContent='flex-end'>
              <Mui.Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Box>
        </Mui.Box>
        <Copyright sx={{ mt: 5 }} />
      </Mui.Container>
    </ThemeProvider>
  )
}
