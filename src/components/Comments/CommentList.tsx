import React from 'react'
import CommentItem from './CommentItem'
import { CommentListProps } from '../../types/props'

const CommentList: React.FC<CommentListProps> = props => {
  return (
    <>
      {props.comments?.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  )
}

export default CommentList
