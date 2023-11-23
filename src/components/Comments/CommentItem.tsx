import React, { useState, useEffect } from 'react'
import { Button, Typography, Box } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { GetCommentsRepliesQuery } from '../../apis/comments'
import AddReply from './AddReply'
import { comment } from '../../types/comment'

export type CommentItemProps = {
  comment: comment
  setAlert: React.Dispatch<React.SetStateAction<string>>
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, setAlert }) => {
  const [GetCommentsReplies] = useLazyQuery(GetCommentsRepliesQuery)
  const [replies, setReplies] = useState<comment[]>([])
  const [showReplies, setShowReplies] = useState(false)
  const [currentPage, setCurrentPage] = useState(2)
  const [pageSize] = useState(2)

  useEffect(() => {
    if (comment.replies && Array.isArray(comment.replies)) {
      const firstTwoReplies = comment.replies.slice(0, 2)
      setReplies(firstTwoReplies)
    }
    // eslint-disable-next-line
  }, [])

  const fetchReplies = async () => {
    const { data, error } = await GetCommentsReplies({
      variables: {
        commentId: comment.id,
        itemsPerPage: pageSize,
        page: (currentPage - 1) * pageSize
      }
    })
    if (error) throw error
    return data
  }

  const handleViewReplies = async () => {
    let data = await fetchReplies()
    if (data.getRepliesOfComment.length === 0 || data.getRepliesOfComment.length < pageSize) {
      setShowReplies(prevState => !prevState)
      setCurrentPage(1)
      setAlert('No further Replies!')
    }
    setReplies(prevData => [...prevData, ...data.getRepliesOfComment])
    setCurrentPage(currentPage + 1)
  }

  return (
    <Box key={comment.id}>
      <Typography variant='subtitle2' color='text.secondary' sx={{ marginTop: 1 }}>
        {comment.user.firstName}
      </Typography>
      <Typography variant='body1' gutterBottom>
        {comment.text}, {comment.id}
      </Typography>
      {comment.replies.length > 0 && (
        <Box>
          {replies.map(reply => (
            <Typography key={reply.id} color='textSecondary' sx={{ marginLeft: 2 }}>
              {reply.text}, {reply.id}
            </Typography>
          ))}
          <Button variant='text' color='primary' onClick={handleViewReplies}>
            {showReplies ? null : 'View More Replies'}
          </Button>
          <AddReply
            postId={comment.post.id}
            commentId={comment.id}
            setReplies={setReplies}
            setAlert={setAlert}
          />
        </Box>
      )}
    </Box>
  )
}

export default CommentItem
