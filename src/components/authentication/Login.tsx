import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Box,
  Container,
  Paper,
  Typography
} from '@mui/material'

import { ErrorContext } from 'context/ErrorProvider'
import { ERROR, ROUTE } from 'enums/index'
import { LoginFormValues, LoginResponse, LoginVariables } from 'types'
import { loginSchema } from 'validations'
import { LoginMutation } from 'apis/auth'

const LoginComponent: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) })

  const [loginUser] = useMutation<LoginResponse, LoginVariables>(LoginMutation)
  const { handleError } = useContext(ErrorContext)
  const navigate = useNavigate()

  const signInHandler = async userData => {
    try {
      const { data } = await loginUser({
        variables: { ...userData }
      })
      if (data?.login.token) {
        localStorage.setItem('token', data.login.token)
        localStorage.setItem('userId', data.login.user.id)

        navigate(ROUTE.DASHBOARD)
      }
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
    }
  }

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    signInHandler(data)
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Container maxWidth='sm'>
        <Paper elevation={24}>
          <Box p={3}>
            <Typography variant='h5' gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
                <InputLabel htmlFor='loginEmail'>Email</InputLabel>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput {...field} id='loginEmail' type='email' label='Email' />
                  )}
                />
                <FormHelperText error={!!errors.email}>{errors.email?.message}</FormHelperText>
              </FormControl>
              <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
                <InputLabel htmlFor='loginPassword'>Password</InputLabel>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput {...field} id='loginPassword' type='password' label='Password' />
                  )}
                />
                <FormHelperText error={!!errors.password}>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
              <Button variant='contained' color='primary' fullWidth type='submit' sx={{ mt: 2 }}>
                Sign In
              </Button>
              <Typography variant='body2' mt={2} textAlign='center'>
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                  Don&apos;t have an account? Sign Up
                </Link>
              </Typography>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginComponent
