import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Typography, Grid, Snackbar, Alert, Box } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { Socket, io } from 'socket.io-client'

import CommentList from '../Comments/CommentList'
import { GetCommentQuery, GetCommentsQuery } from '../../apis/comments'
import AddComment from '../Comments/AddComment'
import { Post } from '../../types/post'
import { comment } from '../../types/comment'

type PostItemProps = {
  post: Post
  deleteHandler: (id: number) => void
}

const PostsItem: React.FC<PostItemProps> = ({ post, deleteHandler }) => {
  const token = localStorage.getItem('token')
  const { id, title, content, user } = post
  const [GetComments] = useLazyQuery(GetCommentsQuery)
  const [GetComment] = useLazyQuery(GetCommentQuery)
  const navigate = useNavigate()

  const [comments, setComments] = useState<comment[]>([])
  const [alert, setAlert] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [showMoreComments, setShowMoreComments] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(3)
  const [socket, setSocket] = useState<Socket>()

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

    newSocket.on('newComment', async (postId, commentId) => {
      let newComment = await fetchComment(commentId)
      console.log('Received new comment:', newComment)

      if (newComment) setComments(prevComments => [...prevComments, newComment])
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the WebSocket server')
    })

    setSocket(newSocket)
  }

  const handleSnackbarClose = reason => {
    if (reason === 'clickaway') {
      return
    }
    setAlert('')
  }

  const fetchComment = async (commentId: number) => {
    try {
      const { data, error } = await GetComment({
        variables: {
          commentId
        }
      })
      if (error) throw error
      return data.Comment
    } catch (err) {
      setAlert(err.message || 'An error occurred')
    }
  }

  const fetchComments = async () => {
    try {
      const { data, error } = await GetComments({
        variables: {
          postId: id,
          itemsPerPage: pageSize,
          page: (currentPage - 1) * pageSize
        }
      })
      if (error) throw error
      return data
    } catch (err) {
      setAlert(err.message || 'An error occurred')
    }
  }

  const handleViewComments = async () => {
    let data = await fetchComments()
    if (data.getComment) {
      setComments(prevData => [...prevData, ...data.getComment])
      setShowComments(prevState => !prevState)
      setShowMoreComments(prevState => !prevState)

      setCurrentPage(currentPage + 1)
      connectSocket()
    }
  }

  const editHandler = () => {
    navigate(`/editpost/?id=${id}`)
  }

  const handleViewMoreComments = async () => {
    let data = await fetchComments()
    if (data?.getComment.length === 0 || data?.getComment.length < pageSize) {
      setShowMoreComments(prevState => !prevState)
      setAlert('No further Comments!')

      setCurrentPage(1)
    }
    setComments(prevData => [...prevData, ...data.getComment])
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
              Posted By: {user.firstName}
            </Typography>

            {user.id.toString() === localStorage.getItem('userId') && (
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
                {showComments && <CommentList comments={comments} setAlert={setAlert} />}
                {showComments && showMoreComments && (
                  <Button variant='text' color='primary' onClick={handleViewMoreComments}>
                    View More Comments
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
          <AddComment post={post} setAlert={setAlert} setComments={setComments} socket={socket} />
        </Card>
      </Grid>
      <Snackbar open={Boolean(alert)} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity='info'>
          {alert}
        </Alert>
      </Snackbar>{' '}
    </Grid>
  )
}

export default PostsItem
