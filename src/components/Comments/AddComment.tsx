import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Box, TextField } from '@mui/material'
import { useMutation } from '@apollo/client'

import { AddCommentMutation } from '../../apis/comments'
import { Post } from '../../types/post'
import { Socket } from 'socket.io-client'
import { setError } from '../../redux/actions/ErrorActions'

export type AddCommentProps = {
  post: Post
  socket: Socket | undefined
}

const AddComment: React.FC<AddCommentProps> = ({ post, socket }) => {
  const [newComment, setNewComment] = useState('')
  const [addComment] = useMutation(AddCommentMutation)
  const dispatch = useDispatch()

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      dispatch(setError('Please enter a comment.'))
      return
    }
    try {
      const { data } = await addComment({
        variables: {
          postId: post.id,
          text: newComment
        }
      })

      if (data?.createComment) {
        dispatch(setError('Comment inserted successfully'))
        setNewComment('')
        socket?.emit('comment', { postId: post.id, commentId: data.createComment.id })
      }
    } catch (err) {
      dispatch(setError(err.message || 'An error occurred while adding a comment.'))
    }
  }

  return (
    <Box sx={{ margin: '5px' }}>
      <TextField
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        label='Add a comment'
        variant='outlined'
        fullWidth
      />
      <Button
        variant='outlined'
        color='primary'
        onClick={handleAddComment}
        sx={{ marginTop: '5px', marginLeft: '5px' }}
      >
        Add Comment
      </Button>
    </Box>
  )
}

export default AddComment
