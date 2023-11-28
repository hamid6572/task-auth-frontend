import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tabs, Tab, Box, Container, Paper, Typography } from '@mui/material'
import { useMutation } from '@apollo/client'

import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { LoginMutation, SignupMutation } from '../apis/auth'
import { setError } from '../redux/actions/ErrorActions'
import { ERROR, ROUTE } from '../enums'
import { LoginResponse, LoginVariables, SignupResponse, SignupVariables } from '../types'

const Authentication: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [registerUser] = useMutation<SignupResponse, SignupVariables>(SignupMutation)
  const [loginUser] = useMutation<LoginResponse, LoginVariables>(LoginMutation)

  const dispatch = useDispatch()
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
      dispatch(setError(err.message || ERROR.GLOBAL_MESSAGE))
    }
  }

  const signUpHandler = async userData => {
    try {
      const { data } = await registerUser({
        variables: {
          ...userData
        }
      })

      if (data?.register.token) {
        localStorage.setItem('token', data.register.token)
        localStorage.setItem('userId', data.register.user.id.toString())

        navigate(ROUTE.DASHBOARD)
      }
    } catch (err) {
      dispatch(setError(err.message || ERROR.GLOBAL_MESSAGE))
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
      </Container>
    </Box>
  )
}

export default Authentication
