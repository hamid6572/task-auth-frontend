import React, { useContext, useState } from 'react'
import { Button, Box, TextField } from '@mui/material'
import { useMutation } from '@apollo/client'

import { AddCommentMutation } from '../../apis/comments'
import { ALERT, ERROR } from '../../enums'
import { AddCommentProps, AddCommentResponse, AddCommentVariables } from '../../types'
import { ErrorContext } from '../../context/ErrorProvider'

const AddComment: React.FC<AddCommentProps> = ({ post, socket }) => {
  const [newComment, setNewComment] = useState('')

  const [addComment] = useMutation<AddCommentResponse, AddCommentVariables>(AddCommentMutation)
  const { handleError } = useContext(ErrorContext)

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      handleError(ERROR.ENTER_COMMENT)
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
        handleError(ALERT.COMMENT_INSERTED)
        setNewComment('')
        socket?.emit('comment', { postId: post.id, commentId: data.createComment.id })
      }
    } catch (err) {
      handleError(err.message || ERROR.GLOBAL_MESSAGE)
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
