import React from 'react'
import PostsItem from './PostsItem'
import { PostListProps } from '../../types/props'

const PostList: React.FC<PostListProps> = props => {
  return (
    <React.Fragment>
      {props.posts.map(item => (
        <PostsItem key={item.id} post={item} deleteHandler={props.deleteHandler} />
      ))}
    </React.Fragment>
  )
}

export default PostList
