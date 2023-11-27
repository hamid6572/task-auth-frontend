import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, CircularProgress, Skeleton, Typography } from '@mui/material'
import { useLazyQuery, useMutation } from '@apollo/client'
import { debounce } from 'lodash'

import { DeletePostMutation, GetPaginatedPostsQuery } from '../apis/posts'
import PostsList from '../components/Posts/PostsList'
import { Post } from '../types/post'
import { setError } from '../redux/actions/ErrorActions'
import { useLocation } from 'react-router-dom'

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(4)

  const [getPaginatedPosts] = useLazyQuery(GetPaginatedPostsQuery)
  const [DeletePost] = useMutation(DeletePostMutation)
  const dispatch = useDispatch()
  const { state } = useLocation()

  const handleScroll = debounce(() => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const windowBottom = window.scrollY + windowHeight

    if (windowBottom >= documentHeight - 100) {
      handleViewPosts()
    }
  }, 100)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const fetchData = async () => {
    try {
      const { data } = await getPaginatedPosts({
        variables: {
          itemsPerPage: pageSize,
          page: (currentPage - 1) * pageSize
        }
      })
      return data
    } catch (err) {
      dispatch(setError(err.message || 'An error occurred'))
    }
  }
  let data = {
    paginatedPosts: []
  }
  const fetch = async () => {
    data = await fetchData().catch(error =>
      dispatch(setError(error.message || 'An error occurred'))
    )
    setPosts(prevData => [...prevData, ...data?.paginatedPosts])
  }

  useEffect(() => {
    fetch()
    setCurrentPage(currentPage + 1)

    // eslint-disable-next-line
  }, [state?.post])

  const handleViewPosts = async () => {
    let data = await fetchData()

    setPosts(prevData => [...prevData, ...data.paginatedPosts])
    if (data?.paginatedPosts.length === 0 || data?.paginatedPosts.length < pageSize) {
      dispatch(setError('No further Posts!'))
      setCurrentPage(1)
    }

    setCurrentPage(currentPage + 1)
  }

  const resetPosts = id => {
    let renewdPosts = posts.filter(post => post.id !== parseInt(id))
    setPosts(renewdPosts)
  }

  const deletePost = async id => {
    try {
      const { data } = await DeletePost({
        variables: {
          id
        }
      })
      if (data) resetPosts(id)
    } catch (err) {
      dispatch(setError(err.message || 'An error occurred'))
    }
  }
  const deleteHandler = (id: number) => {
    deletePost(id)
  }

  return (
    <div>
      {posts.length === 0 ? (
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
        <div>
          <PostsList posts={posts} deleteHandler={deleteHandler} />
        </div>
      )}
    </div>
  )
}

export default Posts
