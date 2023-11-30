import React, { useContext, useState } from 'react'
import { Button, Box, TextField } from '@mui/material'
import { useMutation } from '@apollo/client'

import { AddReplyToCommentMutation } from 'apis/comments'
import { ALERT, ERROR } from 'enums'
import { AddReplyProps, AddReplyToCommentResponse, AddReplyToCommentVariables } from 'types'
import { ErrorContext } from 'context/ErrorProvider'

const AddReply: React.FC<AddReplyProps> = ({ postId, commentId, setReplies }) => {
  const [newReply, setNewReply] = useState('')
  const [addReply] = useMutation<AddReplyToCommentResponse, AddReplyToCommentVariables>(
    AddReplyToCommentMutation
  )
  const { handleError } = useContext(ErrorContext)
  const handleAddReply = async () => {
    if (!newReply.trim()) {
      handleError(ERROR.ENTER_REPLY)
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
        handleError(ALERT.REPLY_INSERTED)
        setReplies(prevReplies => [...prevReplies, data.addReplyToComment])
        setNewReply('')
      }
    } catch (err) {
      handleError(err.message || ERROR.ENTER_REPLY)
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
