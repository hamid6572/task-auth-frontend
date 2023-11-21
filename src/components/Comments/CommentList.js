import CommentItem from './CommentItem'

const CommentList = props => {
  return (
    <>
      {props.comments?.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  )
}

export default CommentList
