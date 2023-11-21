import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'

const MainNav = () => {
  const signoutHandler = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Box sx={{ marginRight: 2 }}>
          <Typography variant='h6' component={Link} to='/posts'>
            Posts
          </Typography>
        </Box>
        <Box>
          <Typography variant='h6' component={Link} to='/createPost'>
            Create Post
          </Typography>
        </Box>
        <Typography sx={{ flexGrow: 1 }} />
        <Typography variant='h6'>
          <Link to='/' onClick={signoutHandler}>
            Signout
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default MainNav
