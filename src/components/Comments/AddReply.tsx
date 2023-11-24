import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Box, TextField } from '@mui/material'
import { useMutation } from '@apollo/client'

import { AddReplyToCommentMutation } from '../../apis/comments'
import { comment } from '../../types/comment'
import { setError } from '../../redux/actions/ErrorActions'

export type AddReplyProps = {
  postId: number
  commentId: number
  setReplies: React.Dispatch<React.SetStateAction<comment[]>>
}

const AddReply: React.FC<AddReplyProps> = ({ postId, commentId, setReplies }) => {
  const dispatch = useDispatch()
  const [newReply, setNewReply] = useState('')
  const [addReply] = useMutation(AddReplyToCommentMutation)

  const handleAddReply = async () => {
    if (!newReply.trim()) {
      dispatch(setError('Please enter a reply.'))
      return
    }
    try {
      console.log(postId, commentId)
      const { data } = await addReply({
        variables: {
          commentId: commentId,
          postId: postId,
          text: newReply
        }
      })

      if (data?.addReplyToComment) {
        dispatch(setError('Reply added successfully'))
        setReplies(prevReplies => [...prevReplies, data.addReplyToComment])
        setNewReply('')
      }
    } catch (err) {
      dispatch(setError(err.message || 'An error occurred while adding a reply.'))
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
