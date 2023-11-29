import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Typography, Box } from '@mui/material'
import { useLazyQuery } from '@apollo/client'

import { GetCommentsRepliesQuery } from '../../apis/comments'
import AddReply from './AddReply'
import { setError } from '../../redux/actions/ErrorActions'
import { ERROR } from '../../enums'
import {
  Reply,
  GetCommentsRepliesResponse,
  GetCommentsRepliesVariables,
  CommentItemProps
} from '../../types'

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [replies, setReplies] = useState<Reply[]>([])
  const [showReplies, setShowReplies] = useState(false)
  const [currentPage, setCurrentPage] = useState(2)
  const [pageSize] = useState(2)

  const [GetCommentsReplies] = useLazyQuery<
    GetCommentsRepliesResponse,
    GetCommentsRepliesVariables
  >(GetCommentsRepliesQuery)
  const dispatch = useDispatch()

  useEffect(() => {
    if (comment.replies) {
      const firstTwoReplies = comment.replies.slice(0, 2)
      if (comment.replies.length > 0) setShowReplies(prevState => !prevState)
      setReplies(firstTwoReplies)
    }
    // eslint-disable-next-line
  }, [])

  const fetchReplies = async () => {
    const { data } = await GetCommentsReplies({
      variables: {
        commentId: comment.id,
        itemsPerPage: pageSize,
        page: (currentPage - 1) * pageSize
      }
    })
    return data?.getRepliesOfComment || []
  }

  const handleViewReplies = async () => {
    try {
      let data = await fetchReplies()

      if (data?.length === 0 || data?.length < pageSize) {
        setShowReplies(prevState => !prevState)
        setCurrentPage(1)
        dispatch(setError(ERROR.NO_FURTHER_REPLIES))
      }
      setReplies(prevData => [...prevData, ...data])
      setCurrentPage(currentPage + 1)
    } catch (error) {
      dispatch(setError(error.message || ERROR.GLOBAL_MESSAGE))
    }
  }

  return (
    <Box key={comment.id} sx={{ marginLeft: 2 }}>
      <Typography variant='subtitle2' color='text.secondary' sx={{ marginTop: 1 }}>
        {comment.user?.firstName}
      </Typography>
      <Typography variant='body1' gutterBottom>
        {comment.text}, {comment.id}
      </Typography>
      {comment?.replies?.length >= 0 && (
        <Box>
          {replies.map(reply => (
            <Typography key={reply.id} color='textSecondary' sx={{ marginLeft: 4 }}>
              {reply.text}, {reply.id}
            </Typography>
          ))}

          {showReplies && (
            <Button variant='text' color='primary' onClick={handleViewReplies}>
              View More Replies
            </Button>
          )}
        </Box>
      )}
      <AddReply postId={comment.post?.id} commentId={comment.id} setReplies={setReplies} />
    </Box>
  )
}

export default CommentItem
