import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { Socket, io } from 'socket.io-client'

import CommentList from '../Comments/CommentList'
import { GetCommentQuery, GetCommentsQuery } from '../../apis/comments'
import AddComment from '../Comments/AddComment'
import { setError } from '../../redux/actions/ErrorActions'
import { ERROR, ROUTE } from '../../enums'
import {
  Comment,
  GetCommentResponse,
  GetCommentVariables,
  GetCommentsResponse,
  GetCommentsVariables,
  PostItemProps
} from '../../types'

const PostsItem: React.FC<PostItemProps> = ({ post, deleteHandler }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [showComments, setShowComments] = useState(false)
  const [showMoreComments, setShowMoreComments] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [socket, setSocket] = useState<Socket>()

  const token = localStorage.getItem('token')
  const { id, title, content, user } = post
  const pageSize = 3

  const [GetComments] = useLazyQuery<GetCommentsResponse, GetCommentsVariables>(GetCommentsQuery)
  const [GetComment] = useLazyQuery<GetCommentResponse, GetCommentVariables>(GetCommentQuery)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const connectSocket = () => {
    const newSocket = io(process.env.REACT_APP_WEB_SOCKET_URL || '', {
      extraHeaders: {
        Authorization: token ? token.replace('Bearer ', '') : ''
      }
    })

    newSocket.on('connect', () => {
      console.log('Connected to the WebSocket server')
      newSocket.emit('joinPostRoom', id)
    })

    newSocket.on('newComment', async commentId => {
      let newComment = await fetchComment(commentId)
      console.log('Received new comment:', newComment)

      if (newComment) setComments(prevComments => [...prevComments, newComment])
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the WebSocket server')
    })

    setSocket(newSocket)
  }

  const fetchComment = async (commentId: number) => {
    const { data } = await GetComment({
      variables: {
        commentId
      }
    })
    return data?.Comment || ({} as Comment)
  }

  const fetchComments = async () => {
    const { data } = await GetComments({
      variables: {
        postId: id,
        itemsPerPage: pageSize,
        page: (currentPage - 1) * pageSize
      }
    })
    return data?.getComment || []
  }

  const handleViewComments = async () => {
    try {
      let data = await fetchComments()
      if (data) {
        setComments(prevData => [...prevData, ...data])
        setShowComments(prevState => !prevState)
        setShowMoreComments(prevState => !prevState)

        setCurrentPage(currentPage + 1)
        connectSocket()
      }
    } catch (err) {
      dispatch(setError(err.message || ERROR.GLOBAL_MESSAGE))
    }
  }

  const editHandler = () => {
    navigate(`${ROUTE.EDIT_POST}/?id=${id}`)
  }

  const handleViewMoreComments = async () => {
    let data = await fetchComments()
    if (data?.length === 0 || data?.length < pageSize) {
      setShowMoreComments(prevState => !prevState)
      dispatch(setError(ERROR.NO_FURTHER_COMMENTS))

      setCurrentPage(1)
    }
    setComments(prevData => [...prevData, ...data])
    setCurrentPage(currentPage + 1)
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Card variant='outlined' sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              {title}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              {content}
            </Typography>

            <Typography variant='subtitle2' color='text.secondary' sx={{ marginTop: 1 }}>
              Posted By: {user?.firstName}
            </Typography>

            {user?.id.toString() === localStorage.getItem('userId') && (
              <Box style={{ marginTop: '1rem' }}>
                <Button variant='outlined' color='success' onClick={editHandler}>
                  Edit
                </Button>
                <Button
                  variant='outlined'
                  color='error'
                  sx={{ marginLeft: 2 }}
                  onClick={() => deleteHandler(id)}
                >
                  Delete
                </Button>
              </Box>
            )}
            <Button variant='text' color='primary' onClick={handleViewComments}>
              {showComments ? 'Hide' : 'View Comments'}
            </Button>

            {showComments && comments.length === 0 ? (
              <Typography variant='body1' gutterBottom>
                No Comments Available
              </Typography>
            ) : (
              <Box>
                {showComments && <CommentList comments={comments} />}
                {showComments && showMoreComments && (
                  <Button variant='text' color='primary' onClick={handleViewMoreComments}>
                    View More Comments
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
          <AddComment post={post} socket={socket} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default PostsItem
