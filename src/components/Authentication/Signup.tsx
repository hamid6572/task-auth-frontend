import React, { useRef } from 'react'
import { TextField, Button, Box } from '@mui/material'

type SignupProps = {
  signupHandler: (data) => void
}

const Signup: React.FC<SignupProps> = props => {
  let emailRef = useRef<HTMLInputElement | null>(null)
  let passwordRef = useRef<HTMLInputElement | null>(null)
  let firstNameRef = useRef<HTMLInputElement | null>(null)
  let lastNameRef = useRef<HTMLInputElement | null>(null)

  const signupHandler = () => {
    const userData = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value
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
      />
      <Button variant='contained' color='primary' fullWidth onClick={signupHandler} sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </Box>
  )
}

export default Signup
