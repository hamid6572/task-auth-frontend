import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useLazyQuery } from '@apollo/client'
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  FormHelperText
} from '@mui/material'

import Layout from '../../components/layout/Layout'
import { ERROR, ROUTE } from '../../enums'
import { CreatePostMutation, EditPostMutation, GetPostQuery } from '../../apis/posts'
import {
  CreatePostResponse,
  CreatePostVariables,
  EditPostResponse,
  EditPostVariables,
  GetPostResponse,
  GetPostVariables,
  Post,
  PostFormValues
} from '../../types'
import { ErrorContext } from '../../context/ErrorProvider'

const PostFormComponent: React.FC = () => {
  const [post, setPost] = React.useState<Post>()
  const [isLoading, setIsLoading] = React.useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostFormValues>()

  const [EditPost] = useMutation<EditPostResponse, EditPostVariables>(EditPostMutation)
  const [createPost] = useMutation<CreatePostResponse, CreatePostVariables>(CreatePostMutation)
  const [GetPost] = useLazyQuery<GetPostResponse, GetPostVariables>(GetPostQuery)

  const navigate = useNavigate()
  const { handleError } = useContext(ErrorContext)
  const search = window.location.search
  const id = parseInt(new URLSearchParams(search).get('id') || '')

  const isEdit = !!id

  const fetchPost = async idParams => {
    try {
      const { data, error } = await GetPost({ variables: { id: idParams } })
      if (error) throw error
      return data?.getPost
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
    }
  }

  const createEditSubmitHandler = async (formData: PostFormValues) => {
    try {
      if (isEdit) {
        const { data } = await EditPost({
          variables: { id, input: { ...formData } }
        })
        if (data?.updatePost) handleError(data?.updatePost.message)

        return data?.updatePost
      } else {
        const { data } = await createPost({
          variables: { input: { ...formData } }
        })
        if (data?.createPost) {
          handleError(data?.createPost.message)

          const post = await fetchPost(data?.createPost.id)

          return post
        }
        return data?.createPost
      }
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
    }
  }

  const savePostHandler = handleSubmit(async formData => {
    const updatedPost = await createEditSubmitHandler(formData)
    console.log('updatedPost', updatedPost)

    setTimeout(() => {
      navigate(ROUTE.DASHBOARD, { state: { post: updatedPost } })
    }, 1000)
  })

  useEffect(() => {
    if (isEdit) {
      fetchPost(id).then(data => {
        setIsLoading(false)
        setPost(data)
      })
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [isEdit])

  const cancelPostHandler = () => navigate(ROUTE.DASHBOARD)

  return (
    <Box>
      <Layout />
      {isLoading ? (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}
        >
          <CircularProgress color='primary' />
        </Box>
      ) : (
        <Container>
          <Typography variant='h4' gutterBottom>
            {isEdit ? 'Edit post' : 'Create post'}
          </Typography>
          <form onSubmit={savePostHandler}>
            <FormControl fullWidth>
              <TextField
                id='posttitle'
                data-testid='posttitle'
                type='text'
                placeholder='Title'
                defaultValue={post?.title}
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
                defaultValue={post?.content}
                {...register('content', { required: 'Content is required' })}
                className='form-control my-2'
              />
              <FormHelperText error>{errors.content?.message}</FormHelperText>
            </FormControl>
            <Box mt={2} className='form-group'>
              <Button
                data-testid={isEdit ? 'editbutton' : 'postbutton'}
                type='submit'
                variant='contained'
                color='primary'
              >
                {isEdit ? 'Edit Post' : 'Create Post'}
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
        </Container>
      )}
    </Box>
  )
}

export default PostFormComponent
