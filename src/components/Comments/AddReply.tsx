import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Box, TextField } from '@mui/material'
import { useMutation } from '@apollo/client'

import { AddReplyToCommentMutation } from '../../apis/comments'
import { setError } from '../../redux/actions/ErrorActions'
import { ALERT, ERROR } from '../../enums'
import { AddReplyProps, AddReplyToCommentResponse, AddReplyToCommentVariables } from '../../types'

const AddReply: React.FC<AddReplyProps> = ({ postId, commentId, setReplies }) => {
  const [newReply, setNewReply] = useState('')
  const [addReply] = useMutation<AddReplyToCommentResponse, AddReplyToCommentVariables>(
    AddReplyToCommentMutation
  )
  const dispatch = useDispatch()

  const handleAddReply = async () => {
    if (!newReply.trim()) {
      dispatch(setError(ERROR.ENTER_REPLY))
      return
    }
    try {
      const { data } = await addReply({
        variables: {
          commentId: commentId,
          postId: postId,
          text: newReply
        }
      })

      if (data?.addReplyToComment) {
        dispatch(setError(ALERT.REPLY_INSERTED))
        setReplies(prevReplies => [...prevReplies, data.addReplyToComment])
        setNewReply('')
      }
    } catch (err) {
      dispatch(setError(err.message || ERROR.ENTER_REPLY))
    }
  }

  return (
    <Box sx={{ margin: '5px' }}>
      <TextField
        value={newReply}
        onChange={e => setNewReply(e.target.value)}
        label='Add a reply'
        variant='outlined'
        fullWidth
      />
      <Button
        variant='outlined'
        color='primary'
        onClick={handleAddReply}
        sx={{ marginTop: '5px', marginLeft: '5px' }}
      >
        Add Reply
      </Button>
    </Box>
  )
}

export default AddReply
