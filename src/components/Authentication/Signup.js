import React from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

const Signup = props => {
  const emailRef = React.useRef('')
  const passwordRef = React.useRef('')

  const signupHandler = () => {
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    props.signupHandler(userData)
  }

  return (
    <Box sx={{ maxWidth: 300, margin: 'auto' }}>
      <Typography variant='h6'>Sign Up</Typography>
      <TextField
        id='loginemail'
        label='Email'
        type='email'
        inputRef={emailRef}
        fullWidth
        variant='outlined'
        margin='normal'
      />
      <TextField
        id='loginpassword'
        label='Password'
        type='password'
        inputRef={passwordRef}
        fullWidth
        variant='outlined'
        margin='normal'
        minLength='8'
      />
      <Button variant='contained' color='primary' fullWidth onClick={signupHandler} sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </Box>
  )
}

export default Signup
