import PostsItem from './PostsItem'

const PostList = props => {
  return (
    <>
      {props.posts.map(item => (
        <PostsItem key={item.id} post={item} deleteHandeler={props.deleteHandeler} />
      ))}
    </>
  )
}

export default PostList
