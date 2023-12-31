import React, { useState, useEffect, useContext } from 'react'
import { Button, Typography, Box } from '@mui/material'
import { useLazyQuery } from '@apollo/client'

import { GetCommentsRepliesQuery } from 'apis/comments'
import { ERROR } from 'enums'
import { ErrorContext } from 'context/ErrorProvider'
import AddReply from './AddReply'
import {
  Reply,
  GetCommentsRepliesResponse,
  GetCommentsRepliesVariables,
  CommentItemProps
} from 'types'

const CommentItem: React.FC<CommentItemProps> = ({ comment, isSearched }) => {
  const [replies, setReplies] = useState<Reply[]>([])
  const [showReplies, setShowReplies] = useState(false)
  const [currentPage, setCurrentPage] = useState(2)
  const [pageSize] = useState(2)

  const [GetCommentsReplies] = useLazyQuery<
    GetCommentsRepliesResponse,
    GetCommentsRepliesVariables
  >(GetCommentsRepliesQuery)
  const { handleError } = useContext(ErrorContext)
  const {
    id,
    text,
    user: { firstName },
    post: { id: postId },
    replies: commentReplies
  } = comment

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
      const data = await fetchReplies()

      if (data?.length === 0 || data?.length < pageSize) {
        setShowReplies(prevState => !prevState)
        setCurrentPage(1)
        handleError(ERROR.NO_FURTHER_REPLIES)
      }
      setReplies(prevData => [...prevData, ...data])
      setCurrentPage(currentPage + 1)
    } catch (error) {
      handleError(error.message || ERROR.GLOBAL_MESSAGE)
    }
  }

  return (
    <Box key={id} sx={{ marginLeft: 2 }}>
      <Typography variant='subtitle2' color='text.secondary' sx={{ marginTop: 1 }}>
        {firstName}
      </Typography>
      <Typography variant='body1' gutterBottom>
        {text}, {id}
      </Typography>
      {commentReplies?.length >= 0 && (
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
      {!isSearched && <AddReply postId={postId} commentId={id} setReplies={setReplies} />}
    </Box>
  )
}

export default CommentItem
