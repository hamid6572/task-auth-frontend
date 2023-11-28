import React from 'react'
import { Box } from '@mui/material'
import { LayoutRouteProps } from 'react-router-dom'
import MainNav from './MainNav'

const Layout: React.FC<LayoutRouteProps> = ({ children }) => {
  return (
    <Box>
      <MainNav />
      <main>{children}</main>
    </Box>
  )
}

export default Layout
