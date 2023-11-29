import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import { useLazyQuery, useMutation } from '@apollo/client'
import { debounce } from 'lodash'

import { DeletePostMutation, GetPaginatedPostsQuery } from '../apis/posts'
import PostsList from '../components/Posts/PostsList'
import { Post } from '../types/post'
import { setError } from '../redux/actions/ErrorActions'
import { ERROR } from '../enums'
import {
  DeletePostResponse,
  DeletePostVariables,
  PaginatedPostsResponse,
  PaginatedPostsVariables
} from '../types'

type PostProps = {
  state: any
}

const Posts: React.FC<PostProps> = ({ state }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingPagination, setIsLoadingPagination] = useState(false)

  const [getPaginatedPosts] = useLazyQuery<PaginatedPostsResponse, PaginatedPostsVariables>(
    GetPaginatedPostsQuery
  )
  const [DeletePost] = useMutation<DeletePostResponse, DeletePostVariables>(DeletePostMutation)

  const dispatch = useDispatch()
  const pageSize = 4
  //console.log('->', state)

  const fetchData = async () => {
    const { data } = await getPaginatedPosts({
      variables: {
        itemsPerPage: pageSize,
        page: (currentPage - 1) * pageSize
      }
    })

    return (
      data || {
        paginatedPosts: []
      }
    ).paginatedPosts
  }

  const handleViewPosts = async () => {
    try {
      let data = await fetchData()
      setPosts(prevData => {
        console.log('prevData from scroll', prevData)
        console.log(data)

        return [...prevData, ...data]
      })
      if (data?.length === 0 || data?.length < pageSize) {
        dispatch(setError(ERROR.NO_FURTHER_POSTS))
        setIsLoadingPagination(false)
        setCurrentPage(1)
      }

      setCurrentPage(currentPage + 1)
    } catch (err) {
      dispatch(setError(err.message || ERROR.GLOBAL_MESSAGE))
    }
  }

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
  }, [handleScroll, state?.post?.title, state?.post?.id])

  const fetch = async () => {
    let data = await fetchData()
    setIsLoading(false)
    if (data?.length !== 0 && data?.length >= pageSize) setIsLoadingPagination(true)

    setPosts(prevData => {
      console.log('prevData', prevData)
      console.log(data)

      return [...prevData, ...data]
    })
  }

  useEffect(() => {
    fetch()
    setCurrentPage(currentPage + 1)

    // eslint-disable-next-line
  }, [state?.post?.title, state?.post?.id])

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
      dispatch(setError(err.message || ERROR.GLOBAL_MESSAGE))
    }
  }

  const deleteHandler = (id: number) => {
    deletePost(id)
  }

  return (
    <Box>
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
        <Box>
          <PostsList posts={posts} deleteHandler={deleteHandler} />
          {isLoadingPagination && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '7vh'
              }}
            >
              <CircularProgress color='primary' />
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Posts
