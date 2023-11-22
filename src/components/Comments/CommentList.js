import CommentItem from './CommentItem'

const CommentList = props => {
  return (
    <>
      {props.comments?.map(comment => (
        <CommentItem key={comment.id} comment={comment} setAlert={props.setAlert} />
      ))}
    </>
  )
}

export default CommentList
