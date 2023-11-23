import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
const Toastcontainer: React.FC = () => {
  return (
    <ToastContainer
      data-testid='error-msg'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

const ToastError = error => {
  toast.error(error, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export { Toastcontainer, ToastError }
