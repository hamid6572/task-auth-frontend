import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material'
import { CreatePostMutation } from '../api/posts'
import Layout from '../components/Layout/Layout'
import { Toastcontainer } from '../tools/toast'

const CreatePost = () => {
  const navigate = useNavigate()
  const titleref = useRef(null)
  const descriptionref = useRef(null)
  const [createPost] = useMutation(CreatePostMutation)
  const [alert, setAlert] = useState(null)

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert(null)
  }

  const createPostAPIHandeler = async post => {
    try {
      const { data, error } = await createPost({
        variables: { input: { ...post } }
      })
      if (error) throw error
      console.log(data)
      if (data?.createPost.message) {
        setAlert(data?.createPost.message)
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
    } catch (err) {
      setAlert(err.message || 'An error occurred')
    }
  }

  const createPostHandler = () => {
    const post = {
      title: titleref.current.value,
      content: descriptionref.current.value
    }

    createPostAPIHandeler(post)
  }

  const cancelPostHandler = () => navigate('/posts')

  return (
    <div>
      <Layout />
      <Container>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>
            <Typography variant='h4' gutterBottom>
              Create post
            </Typography>

            <div>
              <TextField
                id='posttitle'
                data-testid='posttitle'
                type='text'
                className='form-control my-2'
                placeholder='Title'
                inputRef={titleref}
              />
            </div>
            <div>
              <TextField
                multiline
                rows={5}
                className='form-control my-2'
                placeholder='Content'
                inputRef={descriptionref}
              />
            </div>
            <div className='form-group'>
              <Button
                type='submit'
                data-testid='postbutton'
                onClick={createPostHandler}
                variant='contained'
                color='primary'
              >
                Create Post
              </Button>
              <Button
                variant='contained'
                color='primary'
                sx={{ marginLeft: '8px' }}
                onClick={cancelPostHandler}
              >
                Cancel
              </Button>
              <Toastcontainer />
            </div>
          </div>
        </div>
      </Container>
      <Snackbar open={Boolean(alert)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity='success'>
          {alert}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CreatePost