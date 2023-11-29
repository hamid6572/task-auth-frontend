import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
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

import { LoginFormValues, LoginResponse, LoginVariables } from '../../types'
import { LoginMutation } from '../../apis/auth'
import { ErrorContext } from '../../context/ErrorProvider'
import { ERROR, ROUTE } from '../../enums'

const LoginComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()

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
                <OutlinedInput
                  id='loginEmail'
                  type='email'
                  {...register('email', { required: 'Email is required' })}
                  label='Email'
                />
                <FormHelperText error={errors.email && errors.email?.type === 'required'}>
                  {errors.email?.type === 'required' && 'Email is required'}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
                <InputLabel htmlFor='loginPassword'>Password</InputLabel>
                <OutlinedInput
                  id='loginPassword'
                  type='password'
                  {...register('password', { required: 'Password is required' })}
                  label='Password'
                />
                <FormHelperText error={errors.password && errors.password?.type === 'required'}>
                  {errors.password?.type === 'required' && 'Password is required'}
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
