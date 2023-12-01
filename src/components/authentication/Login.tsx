import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormHelperText, Box, Container, Paper, Typography } from '@mui/material'

import { ErrorContext } from 'context/ErrorProvider'
import { FIELDS, PLACEHOLDER, TEXT_TYPE, ERROR, ROUTE } from 'enums/index'
import { LoginFormValues, LoginResponse, LoginVariables } from 'types'
import { FormInputController } from 'components/common'
import { loginSchema } from 'validations'
import { LoginMutation } from 'apis/auth'

const LoginComponent: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: {
      errors: { email, password }
    }
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) })

  const [loginUser] = useMutation<LoginResponse, LoginVariables>(LoginMutation)
  const { handleError } = useContext(ErrorContext)
  const navigate = useNavigate()

  const signInHandler = async userData => {
    try {
      const { data } = await loginUser({
        variables: { ...userData }
      })
      if (data) {
        const {
          login: {
            token,
            user: { id }
          }
        } = data

        localStorage.setItem('token', token)
        localStorage.setItem('userId', id)

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
              <FormInputController
                control={control}
                type={TEXT_TYPE.EMAIL}
                name={FIELDS.EMAIL}
                placeholder={PLACEHOLDER.EMAIL}
              />
              <FormHelperText error={!!email}>{email?.message}</FormHelperText>

              <FormInputController
                control={control}
                type={TEXT_TYPE.PASSOWRD}
                name={FIELDS.PASSOWRD}
                placeholder={PLACEHOLDER.PASSOWRD}
              />
              <FormHelperText error={!!password}>{password?.message}</FormHelperText>
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
