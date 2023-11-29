import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'

import { ROUTE } from '../../enums'
import PostSearch from '../posts/PostsSearch'

const MainNav: React.FC = () => {
  const signoutHandler = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Box sx={{ marginRight: 2 }}>
          <Typography variant='h6' component={Link} to={ROUTE.DASHBOARD}>
            Posts
          </Typography>
        </Box>
        <Box>
          <Typography variant='h6' component={Link} to={ROUTE.CREATE_POST}>
            Create Post
          </Typography>
        </Box>
        <Typography sx={{ flexGrow: 1 }} />
        <PostSearch />
        <Box>
          <Typography variant='h6'>
            <Link to='/' onClick={signoutHandler}>
              Signout
            </Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default MainNav
