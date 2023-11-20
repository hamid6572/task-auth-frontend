import React from 'react'
import { TextField, Button, Box } from '@mui/material'

const Signup = props => {
  const emailRef = React.useRef('')
  const passwordRef = React.useRef('')
  const firstNameRef = React.useRef('')
  const lastNameRef = React.useRef('')

  const signupHandler = () => {
    const userData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    props.signupHandler(userData)
  }

  return (
    <Box sx={{ maxWidth: 300, margin: 'auto' }}>
      <TextField
        id='signupfirstname'
        label='First Name'
        type='text'
        inputRef={firstNameRef}
        fullWidth
        variant='outlined'
        margin='normal'
      />
      <TextField
        id='signuplastname'
        label='Last Name'
        type='text'
        inputRef={lastNameRef}
        fullWidth
        variant='outlined'
        margin='normal'
      />

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
