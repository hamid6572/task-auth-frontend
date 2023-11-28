import { Box } from '@mui/material'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute: React.FC = () => {
  if (!localStorage.getItem('token')) {
    return (
      <Box>
        <Navigate to='/' replace={true} />
      </Box>
    )
  }
  return <Outlet />
}

export default ProtectedRoute
