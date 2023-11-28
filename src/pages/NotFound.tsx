import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Link as MuiLink } from '@mui/material'

const NotFound: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 3 }}>
      <Typography variant='h4'>Page does not Exist!</Typography>
      <Typography variant='body1'>
        Click to go to{' '}
        <span>
          <MuiLink component={Link} to='/' color='primary'>
            Login Page.
          </MuiLink>
        </span>
      </Typography>
    </Box>
  )
}

export default NotFound
