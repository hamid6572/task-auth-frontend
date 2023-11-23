import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, Tab, Box, Container, Paper, Typography, Snackbar, Alert } from '@mui/material'
import { useMutation } from '@apollo/client'

import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { LoginMutation, SignupMutation } from '../apis/auth'

const Authentication = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [registerUser] = useMutation(SignupMutation)
  const [loginUser] = useMutation(LoginMutation)
  const [error, setError] = useState(null)

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setError(null)
  }

  const signInHandler = async userData => {
    try {
      const { data, error } = await loginUser({
        variables: { ...userData }
      })
      if (error) throw error
      if (data?.login.token) {
        localStorage.setItem('token', data.login.token)
        localStorage.setItem('userId', data.login.user.id)

        navigate('Dashboard')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    }
  }

  const signUpHandler = async userData => {
    try {
      const { data, error } = await registerUser({
        variables: {
          ...userData
        }
      })
      if (error) throw error

      if (data?.register.token) {
        localStorage.setItem('token', data.register.token)
        localStorage.setItem('userId', data.register.user.id)

        navigate('Dashboard')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    }
  }
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Container maxWidth='sm'>
        <Paper elevation={24}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='Login' />
            <Tab label='Sign Up' />
          </Tabs>
          <Box p={3}>
            {activeTab === 0 && (
              <Box>
                <Typography variant='h5' gutterBottom>
                  Login
                </Typography>
                <Login signInHandler={signInHandler} />
              </Box>
            )}
            {activeTab === 1 && (
              <Box>
                <Typography variant='h5' gutterBottom>
                  Sign Up
                </Typography>
                <Signup signupHandler={signUpHandler} />
              </Box>
            )}
          </Box>
        </Paper>
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity='error'>
            {error}
          </Alert>
        </Snackbar>{' '}
      </Container>
    </Box>
  )
}

export default Authentication
