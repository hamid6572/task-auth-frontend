import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useLazyQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  FormHelperText
} from '@mui/material'

import Layout from 'components/layout/Layout'
import { ERROR, ROUTE } from 'enums'
import { CreatePostMutation, EditPostMutation, GetPostQuery } from 'apis/posts'
import { ErrorContext } from 'context/ErrorProvider'
import { postFormSchema } from 'validations'
import {
  CreatePostResponse,
  CreatePostVariables,
  EditPostResponse,
  EditPostVariables,
  GetPostResponse,
  GetPostVariables,
  Post,
  PostFormValues
} from 'types'

const PostFormComponent: React.FC = () => {
  const [post, setPost] = React.useState<Post>()
  const [isLoading, setIsLoading] = React.useState(true)
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<PostFormValues>({ resolver: yupResolver(postFormSchema) })

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
      return data
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
    }
  }

  const createEditSubmitHandler = async (formData: PostFormValues) => {
    let postResult: GetPostResponse = {} as GetPostResponse
    try {
      if (isEdit) {
        const { data } = await EditPost({
          variables: { id, input: { ...formData } }
        })
        if (data?.updatePost) handleError(data?.updatePost.message)
        postResult = (await fetchPost(data?.updatePost.id)) || ({} as GetPostResponse)
      } else {
        const { data } = await createPost({
          variables: { input: { ...formData } }
        })
        if (data?.createPost) {
          handleError(data?.createPost.message)

          postResult = (await fetchPost(data?.createPost.id)) || ({} as GetPostResponse)
        }
      }

      setTimeout(() => {
        navigate(ROUTE.DASHBOARD, { state: { post: postResult } })
      }, 1000)
      return postResult
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
    }
  }

  const savePostHandler = handleSubmit(formData => {
    createEditSubmitHandler(formData)
  })

  useEffect(() => {
    if (isEdit) {
      fetchPost(id).then(data => {
        setIsLoading(false)
        setPost(data?.getPost)
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
              <Controller
                name='title'
                control={control}
                defaultValue={post?.title || ''}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    placeholder='Title'
                    className='form-control my-2'
                    data-testid='posttitle'
                  />
                )}
              />
              <FormHelperText error>{errors.title?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <Controller
                name='content'
                control={control}
                defaultValue={post?.content || ''}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder='Content'
                    className='form-control my-2'
                    rows={5}
                    cols={10}
                  />
                )}
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
