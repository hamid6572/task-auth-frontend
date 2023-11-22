import { useEffect, useState } from 'react'
import { Typography, Snackbar, Alert } from '@mui/material'
import { useLazyQuery } from '@apollo/client'

import { GetPostsQuery } from '../api/posts'
import PostsList from '../components/Posts/PostsList'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [getPosts] = useLazyQuery(GetPostsQuery)
  const [error, setError] = useState(null)

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setError(null)
  }

  useEffect(() => {
    async function fetchData() {
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
    fetchData()
    // eslint-disable-next-line
  }, [])

  // const resetPosts = id => {
  //   let renewdPosts = posts.filter(post => parseInt(post.id) !== parseInt(id))
  //   setPosts(renewdPosts)
  // }

  const deleteHandeler = id => {
    //   const err = new Error()
    //   DeletePostAPI(id)
    //     .then(res => {
    //       err.status = res.status
    //       return res.json()
    //     })
    //     .then(data => {
    //       if (err.status !== 200) {
    //         throw new Error(data.message)
    //       }
    //       resetPosts(id)
    //     })
    //     .catch(err => {
    //       ToastError(err)
    //     })
  }

  return (
    <div>
      {posts.length === 0 ? (
        <Typography variant='h4' align='center' gutterBottom>
          No Posts Available
        </Typography>
      ) : (
        <div>
          <PostsList posts={posts} deleteHandeler={deleteHandeler} />
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
