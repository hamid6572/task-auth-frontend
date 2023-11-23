import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/client'
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
  CircularProgress
} from '@mui/material'

import { EditPostMutation, GetPostQuery } from '../apis/posts'
import Layout from '../components/Layout/Layout'

const EditPost = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const [GetPost] = useLazyQuery(GetPostQuery)
  const [EditPost] = useMutation(EditPostMutation)

  const search = window.location.search
  let id = parseInt(new URLSearchParams(search).get('id'))

  const fetchPost = async () => {
    try {
      const { data, error } = await GetPost({
        variables: {
          id
        }
      })
      if (error) throw error
      return data.getPost
    } catch (err) {
      setAlert(err.message || 'An error occurred')
    }
  }

  const editPost = async post => {
    try {
      const { data, error } = await EditPost({
        variables: {
          id,
          input: {
            ...post
          }
        }
      })
      if (error) throw error

      return data.updatePost
    } catch (err) {
      setAlert(err.message || 'An error occurred')
    }
  }

  useEffect(() => {
    fetchPost().then(data => {
      setIsLoading(false)
      setPost(data)
    })
    // eslint-disable-next-line
  }, [])

  const titleInput = post?.title
  const contentInput = post?.content
  const updatedTitleRef = useRef()
  const updatedContentRef = useRef()

  const editPostHandler = async () => {
    const updatedPost = {
      title: updatedTitleRef.current.value,
      content: updatedContentRef.current.value
    }

    let updatedPostResult = await editPost(updatedPost)
    if (updatedPostResult) {
      setAlert(updatedPostResult.message)
      setTimeout(() => {
        navigate('/posts')
      }, 1000)
    }
  }

  const cancelPostHandler = () => navigate('/posts')
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert(null)
  }

  return (
    <div>
      <Layout />
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh'
          }}
        >
          <CircularProgress color='primary' />
        </Box>
      ) : (
        <Container>
          <Typography variant='h4' gutterBottom>
            Edit post
          </Typography>
          <TextField
            data-testid='posttitle'
            type='text'
            label='Title'
            className='form-control my-2'
            defaultValue={titleInput}
            inputRef={updatedTitleRef}
          />
          <TextField
            multiline
            rows={5}
            className='form-control my-2'
            label='Description'
            defaultValue={contentInput}
            inputRef={updatedContentRef}
          />
          <Box mt={2}>
            <Button
              data-testid='editbutton'
              type='submit'
              variant='contained'
              color='primary'
              onClick={editPostHandler}
            >
              Edit Post
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{ marginLeft: '8px' }}
              onClick={cancelPostHandler}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      )}
      <Snackbar open={Boolean(alert)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity='success'>
          {alert}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default EditPost
