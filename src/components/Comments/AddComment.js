import { useState } from 'react'
import { Button, Box, TextField } from '@mui/material'
import { useMutation } from '@apollo/client'
import { AddCommentMutation } from '../../api/comments'

const AddComment = props => {
  const [newComment, setNewComment] = useState('')
  const [addComment] = useMutation(AddCommentMutation)

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      props.setAlert('Please enter a comment.')
      return
    }
    try {
      const { data, error } = await addComment({
        variables: {
          postId: props.post.id,
          text: newComment
        }
      })
      console.log(data)
      if (error) throw error

      if (data?.createComment) {
        props.setAlert('Comment inserted successfully')

        props.setComments(prevComments => [...prevComments, data.createComment])
        setNewComment('')
      }
    } catch (err) {
      props.setAlert(err.message || 'An error occurred while adding a comment.')
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
