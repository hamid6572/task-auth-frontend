import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, FormHelperText, Box, Container, Paper, Typography } from '@mui/material'

import { FIELDS, PLACEHOLDER, TEXT_TYPE, ERROR, ROUTE } from 'enums'
import { SignupFormValues, SignupResponse, SignupVariables } from 'types'
import { FormInputController } from 'components/common'
import { ErrorContext } from 'context/ErrorProvider'
import { SignupMutation } from 'apis/auth'
import { signupSchema } from 'validations'

const SignUpComponent: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: {
      errors: { email, password, firstName, lastName }
    }
  } = useForm<SignupFormValues>({ resolver: yupResolver(signupSchema) })

  const [registerUser] = useMutation<SignupResponse, SignupVariables>(SignupMutation)
  const { handleError } = useContext(ErrorContext)
  const navigate = useNavigate()

  const signUpHandler = async userData => {
    try {
      const { data } = await registerUser({
        variables: { ...userData }
      })

      if (data) {
        const {
          register: {
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
              <FormInputController
                control={control}
                type={TEXT_TYPE.TEXT}
                name={FIELDS.FIRST_NAME}
                placeholder={PLACEHOLDER.FIRST_NAME}
              />
              <FormHelperText error={!!firstName}>{firstName?.message}</FormHelperText>

              <FormInputController
                control={control}
                type={TEXT_TYPE.TEXT}
                name={FIELDS.LAST_NAME}
                placeholder={PLACEHOLDER.LAST_NAME}
              />
              <FormHelperText error={!!lastName}>{lastName?.message}</FormHelperText>

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
