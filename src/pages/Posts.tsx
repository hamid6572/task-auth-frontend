import React, { useEffect, useState } from 'react'
import { Typography, Snackbar, Alert } from '@mui/material'
import { useLazyQuery, useMutation } from '@apollo/client'

import { DeletePostMutation, GetPostsQuery } from '../apis/posts'
import PostsList from '../components/Posts/PostsList'
import { Post } from '../types/post'

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [getPosts] = useLazyQuery(GetPostsQuery)
  const [error, setError] = useState(null)
  const [DeletePost] = useMutation(DeletePostMutation)

  const handleSnackbarClose = reason => {
    if (reason === 'clickaway') {
      return
    }
    setError(null)
  }

  const fetchData = async () => {
    try {
      const { data, error } = await getPosts()
      if (error) throw error
      if (data.listPosts) {
        setPosts(data.listPosts)
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const resetPosts = id => {
    let renewdPosts = posts.filter(post => post.id !== parseInt(id))
    setPosts(renewdPosts)
  }
  const deletePost = async id => {
    try {
      console.log('==>', id)
      const { data } = await DeletePost({
        variables: {
          id
        }
      })
      console.log(data)
      if (data) {
        resetPosts(id)
      }
    } catch (err) {
      console.log(err)
      setError(err.message || 'An error occurred')
    }
  }
  const deleteHandler = (id: number) => {
    deletePost(id)
  }

  return (
    <div>
      {posts.length === 0 ? (
        <Typography variant='h4' align='center' gutterBottom>
          No Posts Available
        </Typography>
      ) : (
        <div>
          <PostsList posts={posts} deleteHandler={deleteHandler} />
        </div>
      )}
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity='error'>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Posts
