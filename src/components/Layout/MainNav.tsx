import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { GlobalSearchQuery } from '../../apis/posts'
import { useLazyQuery } from '@apollo/client'

import React, { useState } from 'react'

const MainNav: React.FC = () => {
  const [searchPosts] = useLazyQuery(GlobalSearchQuery)
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [alert, setAlert] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setAlert('Nothing to search.')
      return
    }
    try {
      const { data, error } = await searchPosts({
        variables: {
          input: searchText
        }
      })
      if (error) throw error
      if (data?.search) {
        setSearchResults(data.search)
        navigate('/search', { state: { results: data.search } })
      }
    } catch (error) {
      setAlert(error.message || 'An error occurred while search.')
    }
    if (searchResults) {
      return null
    }
  }

  const handleSnackbarClose = reason => {
    if (reason === 'clickaway') {
      return
    }
    setAlert('')
  }

  const signoutHandler = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
  }

  const isDashboardOrPosts = location.pathname === '/Dashboard' || location.pathname === '/posts'
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
        {isDashboardOrPosts && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InputBase
              placeholder='Search...'
              sx={{
                color: 'white',
                '& input': {
                  color: 'white'
                },
                border: '0.5px solid white',
                borderRadius: '2px',
                mr: 1,
                padding: '4px'
              }}
              onChange={e => setSearchText(e.target.value)}
            />
            <IconButton
              aria-label='search'
              sx={{ color: 'white', marginRight: '2px' }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}
        <Box>
          <Typography variant='h6'>
            <Link to='/' onClick={signoutHandler}>
              Signout
            </Link>
          </Typography>
        </Box>
      </Toolbar>
      <Snackbar open={Boolean(alert)} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity='info'>
          {alert}
        </Alert>
      </Snackbar>{' '}
    </AppBar>
  )
}

export default MainNav
