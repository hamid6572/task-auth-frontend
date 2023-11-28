import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, FormControl, InputLabel, OutlinedInput, FormHelperText, Box } from '@mui/material'

import { LoginFormValues, LoginProps } from '../../types'

const Login: React.FC<LoginProps> = props => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    props.signInHandler(data)
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
          <InputLabel htmlFor='loginemail'>Email</InputLabel>
          <OutlinedInput
            id='loginemail'
            type='email'
            {...register('email', { required: 'Email is required' })}
            label='Email'
          />
          <FormHelperText error={errors.email && errors.email?.type === 'required'}>
            {errors.email?.type === 'required' && 'Email is required'}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ width: 400 }} variant='outlined' margin='normal'>
          <InputLabel htmlFor='loginpassword'>Password</InputLabel>
          <OutlinedInput
            id='loginpassword'
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
      </form>
    </Box>
  )
}

export default Login
