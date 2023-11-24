import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { TextField, Button, Container, Typography } from '@mui/material'

import Layout from '../components/Layout/Layout'
import { Toastcontainer } from '../tools/toast'
import { CreatePostMutation } from '../apis/posts'
import { setError } from '../redux/actions/ErrorActions'

type post = {
  title: string
  content: string
}

const CreatePost: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const titleref = useRef<HTMLInputElement | null>(null)
  const descriptionref = useRef<HTMLInputElement | null>(null)
  const [createPost] = useMutation(CreatePostMutation)

  const createPostAPIHandeler = async (post: post) => {
    try {
      const { data } = await createPost({
        variables: { input: { ...post } }
      })
      if (data?.createPost.message) {
        dispatch(setError(data?.createPost.message))
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      }
    } catch (err) {
      dispatch(setError(err.message || 'An error occurred'))
    }
  }

  const createPostHandler = () => {
    createPostAPIHandeler({
      title: titleref.current?.value || '',
      content: descriptionref.current?.value || ''
    })
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
                required
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
    </div>
  )
}

export default CreatePost
