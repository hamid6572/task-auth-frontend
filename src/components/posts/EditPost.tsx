import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/client'
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material'

import { EditPostMutation, GetPostQuery } from '../../apis/posts'
import Layout from '../../components/layout/Layout'
import { ERROR, ROUTE } from '../../enums'
import {
  EditPostResponse,
  EditPostVariables,
  GetPostResponse,
  GetPostVariables,
  Post
} from '../../types'
import { ErrorContext } from '../../context/ErrorProvider'

const EditPostComponent: React.FC = () => {
  const [post, setPost] = useState<Post>()
  const [isLoading, setIsLoading] = useState(true)

  const [GetPost] = useLazyQuery<GetPostResponse, GetPostVariables>(GetPostQuery)
  const [EditPost] = useMutation<EditPostResponse, EditPostVariables>(EditPostMutation)

  const navigate = useNavigate()
  const { handleError } = useContext(ErrorContext)
  const search = window.location.search
  const id = parseInt(new URLSearchParams(search).get('id') || '')

  const fetchPost = async () => {
    try {
      const { data, error } = await GetPost({
        variables: {
          id
        }
      })
      if (error) throw error
      return data?.getPost
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
    }
  }

  const editPost = async post => {
    try {
      const { data } = await EditPost({
        variables: {
          id,
          input: {
            ...post
          }
        }
      })

      return data?.updatePost
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
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
  const updatedTitleRef = useRef<HTMLInputElement | null>(null)
  const updatedContentRef = useRef<HTMLInputElement | null>(null)

  const editPostHandler = async () => {
    const updatedPost = {
      title: updatedTitleRef.current?.value || '',
      content: updatedContentRef.current?.value || ''
    }

    const updatedPostResult = await editPost(updatedPost)
    if (updatedPostResult) {
      handleError(updatedPostResult.message)
      setTimeout(() => {
        navigate(ROUTE.DASHBOARD, { state: { post: updatedPost } })
      }, 1000)
    }
  }

  const cancelPostHandler = () => navigate(ROUTE.DASHBOARD)

  return (
    <Box>
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
    </Box>
  )
}

export default EditPostComponent
