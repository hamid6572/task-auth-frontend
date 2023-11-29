import React, { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { ErrorContext } from './ErrorProvider'

const GlobalSnackbar: React.FC = () => {
  const { error, clearError } = useContext(ErrorContext)

  const handleClose = () => {
    clearError()
  }

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <MuiAlert elevation={6} variant='filled' onClose={handleClose} severity='info'>
        {error}
      </MuiAlert>
    </Snackbar>
  )
}

export default GlobalSnackbar
