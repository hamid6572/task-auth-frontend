import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, InputBase, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useLazyQuery } from '@apollo/client'

import { setError } from '../../redux/actions/ErrorActions'
import { GlobalSearchQuery } from '../../apis/posts'
import { ERROR, ROUTE } from '../../enums'

const PostSearch: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [searchPosts] = useLazyQuery(GlobalSearchQuery)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = async () => {
    if (!searchText.trim()) {
      dispatch(setError(ERROR.NONE_TO_SEARCH))
      return
    }

    try {
      const { data } = await searchPosts({
        variables: {
          input: searchText
        }
      })
      if (data?.search.length === 0) dispatch(setError(ERROR.EMPTY_DATA))
      else {
        setSearchResults(data.search)
        navigate('/search', { state: { results: data.search } })
      }
    } catch (error) {
      dispatch(setError(error.message || ERROR.GLOBAL_MESSAGE))
    }
    if (searchResults) {
      return null
    }
  }

  return (
    <Box>
      {location.pathname === ROUTE.DASHBOARD && (
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
    </Box>
  )
}

export default PostSearch
