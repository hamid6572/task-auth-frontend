import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Button, Container, Typography, Box, FormControl, FormHelperText } from '@mui/material'
import { TextField } from '@mui/material'

import Layout from 'components/layout/Layout'
import { CreatePostMutation } from 'apis/posts'
import { ERROR, ROUTE } from 'enums'
import { CreatePostResponse, CreatePostVariables, PostFormValues } from 'types'
import { ErrorContext } from 'context/ErrorProvider'

const CreatePostComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostFormValues>()
  const [createPost] = useMutation<CreatePostResponse, CreatePostVariables>(CreatePostMutation)

  const navigate = useNavigate()
  const { handleError } = useContext(ErrorContext)
  const createPostAPIHandler = async (formData: PostFormValues) => {
    try {
      const { data } = await createPost({
        variables: { input: { ...formData } }
      })
      if (data?.createPost.message) {
        handleError(data?.createPost.message)
        setTimeout(() => {
          navigate(ROUTE.DASHBOARD, { state: { post: formData } })
        }, 1000)
      }
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
    }
  }

  const createPostHandler = handleSubmit(formData => {
    createPostAPIHandler(formData)
  })

  const cancelPostHandler = () => navigate(ROUTE.DASHBOARD)

  return (
    <Box>
      <Layout />
      <Container>
        <Box className='row'>
          <Box className='col-md-8 col-md-offset-2'>
            <Typography variant='h4' gutterBottom>
              Create post
            </Typography>

            <form onSubmit={createPostHandler}>
              <FormControl fullWidth>
                <TextField
                  id='postTitle'
                  data-testid='postTitle'
                  type='text'
                  placeholder='Title'
                  {...register('title', { required: 'Title is required' })}
                  className='form-control my-2'
                />
                <FormHelperText error>{errors.title?.message}</FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  multiline
                  minRows={5}
                  maxRows={10}
                  placeholder='Content'
                  {...register('content', { required: 'Content is required' })}
                  className='form-control my-2'
                />
                <FormHelperText error>{errors.content?.message}</FormHelperText>
              </FormControl>

              <Box className='form-group'>
                <Button type='submit' data-testid='postbutton' variant='contained' color='primary'>
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
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default CreatePostComponent
