import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { clearError } from './actions/ErrorActions'

const ErrorSnackbar: React.FC = () => {
  const errorMessage = useSelector((state: any) => state.error.errorMessage)
  const dispatch = useDispatch()
  const handleClose = reason => {
    dispatch(clearError())

    if (reason === 'clickaway') {
      return
    }
  }
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearError())
    }, 4000)
  }, [])

  return (
    <Snackbar open={Boolean(errorMessage)} autoHideDuration={1000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='info'>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}

export default ErrorSnackbar
