import { comment } from '../../types/comment'
import CommentItem from './CommentItem'
import React from 'react'

export type CommentListProps = {
  comments: comment[]
}

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
