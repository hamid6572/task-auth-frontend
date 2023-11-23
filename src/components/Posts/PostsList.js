import PostsItem from './PostsItem'

const PostList = props => {
  return (
    <>
      {props.posts.map(item => (
        <PostsItem key={item.id} post={item} deleteHandler={props.deleteHandler} />
      ))}
    </>
  )
}

export default PostList
