import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useLazyQuery, useMutation } from '@apollo/client'

import { DeletePostMutation, GetPaginatedPostsQuery } from '../apis/posts'
import PostsList from '../components/Posts/PostsList'
import { Post } from '../types/post'
import { useDispatch } from 'react-redux'
import { setError } from '../redux/actions/ErrorActions'

const Posts: React.FC = () => {
  const dispatch = useDispatch()
  const [getPaginatedPosts] = useLazyQuery(GetPaginatedPostsQuery)
  const [DeletePost] = useMutation(DeletePostMutation)

  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5)
  const [showPosts, setShowPosts] = useState(true)

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const windowBottom = window.scrollY + windowHeight

    if (windowBottom >= documentHeight - 100) {
      handleViewPosts()
    }
  }

  const fetchData = async () => {
    try {
      const { data, error } = await getPaginatedPosts({
        variables: {
          itemsPerPage: pageSize,
          page: (currentPage - 1) * pageSize
        }
      })
      if (error) throw error
      return data
    } catch (err) {
      dispatch(setError(err.message || 'An error occurred'))
    }
  }
  let data = {
    paginatedPosts: []
  }
  const fetch = async () => {
    data = await fetchData()
    setPosts(prevData => [...prevData, ...data?.paginatedPosts])
  }

  useEffect(() => {
    fetch().catch(error => dispatch(setError(error.message || 'An error occurred')))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line
  }, [posts])

  const handleViewPosts = async () => {
    let data = await fetchData()

    setPosts(prevData => [...prevData, ...data.paginatedPosts])
    if (data?.paginatedPosts.length === 0 || data?.paginatedPosts.length < pageSize) {
      setShowPosts(prevState => !prevState)
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
      console.log(data)
      if (data) {
        resetPosts(id)
      }
    } catch (err) {
      console.log(err)
      dispatch(setError(err.message || 'An error occurred'))
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
    </div>
  )
}

export default Posts
