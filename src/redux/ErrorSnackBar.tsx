import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { clearError } from './actions/ErrorActions'
import { useNavigate } from 'react-router-dom'

const ErrorSnackbar: React.FC = () => {
  const errorMessage = useSelector((state: any) => state.error.errorMessage)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = reason => {
    dispatch(clearError())
    if (reason === 'clickaway') {
      return
    }
  }

  useEffect(() => {
    const unauthorizedErrorText = 'Unauthorized'
    if (errorMessage && errorMessage.toLowerCase().includes(unauthorizedErrorText.toLowerCase())) {
      navigate('/')
    }
  }, [errorMessage, navigate])

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearError())
    }, 4000)
  }, [dispatch])

  return (
    <Snackbar open={Boolean(errorMessage)} autoHideDuration={1000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='info'>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}

export default ErrorSnackbar
