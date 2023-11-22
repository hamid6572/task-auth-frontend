import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Typography, Grid, Snackbar, Alert, Box } from '@mui/material'
import { useLazyQuery } from '@apollo/client'

import CommentList from '../Comments/CommentList'
import { GetCommentsQuery } from '../../api/comments'
import AddComment from '../Comments/AddComment'

const PostsItem = props => {
  const [GetComments] = useLazyQuery(GetCommentsQuery)
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [alert, setAlert] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const [showMoreComments, setShowMoreComments] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(3)

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert(null)
  }

  const fetchComments = async () => {
    try {
      const { data, error } = await GetComments({
        variables: {
          postId: props.post.id,
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
    }
  }

  const editHandler = () => {
    navigate(`/editpost/?id=${props.post.id}`)
  }

  const handleViewMoreComments = async () => {
    let data = await fetchComments()
    if (data?.getComment.length === 0 || data?.getComment.length < pageSize) {
      setShowMoreComments(prevState => !prevState)
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
              {props.post.title}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              {props.post.content}
            </Typography>

            <Typography variant='subtitle2' color='text.secondary' sx={{ marginTop: 1 }}>
              Posted By: {props.post.user.firstName}
            </Typography>

            {props.post.user.id.toString() === localStorage.getItem('userId') && (
              <Box style={{ marginTop: '1rem' }}>
                <Button variant='outlined' color='success' onClick={editHandler}>
                  Edit
                </Button>
                <Button
                  variant='outlined'
                  color='error'
                  sx={{ marginLeft: 2 }}
                  onClick={() => props.deleteHandler(props.post.id)}
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
                {showComments ? <CommentList comments={comments} setAlert={setAlert} /> : null}
                <Button variant='text' color='primary' onClick={handleViewMoreComments}>
                  {showComments && showMoreComments ? 'View More Comments' : null}
                </Button>
              </Box>
            )}
          </CardContent>
          <AddComment post={props.post} setAlert={setAlert} setComments={setComments} />
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
