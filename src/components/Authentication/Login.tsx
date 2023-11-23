import React, { useRef } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { User } from '../../types/user'

type LoginProps = {
  signInHandler: (data) => void
}

const Login: React.FC<LoginProps> = props => {
  let emailRef = useRef<HTMLInputElement | null>(null)
  let passwordRef = useRef<HTMLInputElement | null>(null)

  const signinHandler = () => {
    const userData = {
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || ''
    }
    props.signInHandler(userData)
  }

  return (
    <Box sx={{ maxWidth: 300, margin: 'auto' }}>
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
      <Button variant='contained' color='primary' fullWidth onClick={signinHandler} sx={{ mt: 2 }}>
        Sign In
      </Button>
    </Box>
  )
}

export default Login
