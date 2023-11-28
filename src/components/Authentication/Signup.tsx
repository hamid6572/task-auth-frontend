import React from 'react'
import { Button, FormControl, InputLabel, OutlinedInput, FormHelperText, Box } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'

import { SignupFormValues, SignupProps } from '../../types'

const Signup: React.FC<SignupProps> = props => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValues>()

  const onSubmit: SubmitHandler<SignupFormValues> = data => {
    props.signupHandler(data)
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
          <InputLabel htmlFor='signupfirstname'>First Name</InputLabel>
          <OutlinedInput
            id='signupfirstname'
            type='text'
            {...register('firstName', { required: 'First Name is required' })}
            label='First Name'
          />
          <FormHelperText error={!!errors.firstName}>{errors.firstName?.message}</FormHelperText>
        </FormControl>
        <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
          <InputLabel htmlFor='signuplastname'>Last Name</InputLabel>
          <OutlinedInput
            id='signuplastname'
            type='text'
            {...register('lastName', { required: 'Last Name is required' })}
            label='Last Name'
          />
          <FormHelperText error={!!errors.lastName}>{errors.lastName?.message}</FormHelperText>
        </FormControl>
        <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
          <InputLabel htmlFor='signupemail'>Email</InputLabel>
          <OutlinedInput
            id='signupemail'
            type='email'
            {...register('email', { required: 'Email is required' })}
            label='Email'
          />
          <FormHelperText error={!!errors.email}>{errors.email?.message}</FormHelperText>
        </FormControl>
        <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
          <InputLabel htmlFor='signuppassword'>Password</InputLabel>
          <OutlinedInput
            id='signuppassword'
            type='password'
            {...register('password', { required: 'Password is required' })}
            label='Password'
          />
          <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
        </FormControl>
        <Button variant='contained' color='primary' fullWidth type='submit' sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>
    </Box>
  )
}

export default Signup
