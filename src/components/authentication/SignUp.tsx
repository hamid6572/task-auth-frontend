import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
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
import { useForm, SubmitHandler } from 'react-hook-form'

import { SignupFormValues, SignupResponse, SignupVariables } from '../../types'
import { SignupMutation } from '../../apis/auth'
import { ErrorContext } from '../../context/ErrorProvider'
import { ERROR, ROUTE } from '../../enums'

const SignUpComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValues>()

  const [registerUser] = useMutation<SignupResponse, SignupVariables>(SignupMutation)

  const { handleError } = useContext(ErrorContext)
  const navigate = useNavigate()

  const signUpHandler = async userData => {
    try {
      const { data } = await registerUser({
        variables: {
          ...userData
        }
      })

      if (data?.register.token) {
        localStorage.setItem('token', data.register.token)
        localStorage.setItem('userId', data.register.user.id?.toString())

        navigate(ROUTE.DASHBOARD)
      }
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
    }
  }
  const onSubmit: SubmitHandler<SignupFormValues> = data => {
    signUpHandler(data)
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Container maxWidth='sm'>
        <Paper elevation={24}>
          <Box p={3}>
            <Typography variant='h5' gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
                <InputLabel htmlFor='signUpFirstName'>First Name</InputLabel>
                <OutlinedInput
                  id='signUpFirstName'
                  type='text'
                  {...register('firstName', { required: 'First Name is required' })}
                  label='First Name'
                />
                <FormHelperText error={!!errors.firstName}>
                  {errors.firstName?.message}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
                <InputLabel htmlFor='signUpLastName'>Last Name</InputLabel>
                <OutlinedInput
                  id='signUpLastName'
                  type='text'
                  {...register('lastName', { required: 'Last Name is required' })}
                  label='Last Name'
                />
                <FormHelperText error={!!errors.lastName}>
                  {errors.lastName?.message}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
                <InputLabel htmlFor='signUpEmail'>Email</InputLabel>
                <OutlinedInput
                  id='signUpEmail'
                  type='email'
                  {...register('email', { required: 'Email is required' })}
                  label='Email'
                />
                <FormHelperText error={!!errors.email}>{errors.email?.message}</FormHelperText>
              </FormControl>
              <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
                <InputLabel htmlFor='signUpPassword'>Password</InputLabel>
                <OutlinedInput
                  id='signUpPassword'
                  type='password'
                  {...register('password', { required: 'Password is required' })}
                  label='Password'
                />
                <FormHelperText error={!!errors.password}>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
              <Button variant='contained' color='primary' fullWidth type='submit' sx={{ mt: 2 }}>
                Sign Up
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default SignUpComponent
