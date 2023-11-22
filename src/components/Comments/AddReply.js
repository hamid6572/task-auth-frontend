import { useState } from 'react'
import { Button, Box, TextField } from '@mui/material'
import { useMutation } from '@apollo/client'
import { AddReplyToCommentMutation } from '../../api/comments'

const AddReply = ({ postId, commentId, setAlert, setReplies }) => {
  const [newReply, setNewReply] = useState('')
  const [addReply] = useMutation(AddReplyToCommentMutation)

  const handleAddReply = async () => {
    if (!newReply.trim()) {
      setAlert('Please enter a reply.')
      return
    }
    try {
      console.log(postId, commentId)
      const { data, error } = await addReply({
        variables: {
          commentId: commentId,
          postId: postId,
          text: newReply
        }
      })
      if (error) throw error
      console.log(data)
      if (data?.addReplyToComment) {
        setAlert('Reply added successfully')
        setReplies(prevReplies => [...prevReplies, data.addReplyToComment])
        setNewReply('')
      }
    } catch (err) {
      setAlert(err.message || 'An error occurred while adding a reply.')
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
