import React from 'react'
import PostsItem from './PostsItem'
import { Post } from '../../types/post'

export type PostListProps = {
  posts: Post[]
  deleteHandler: (id: number) => void
}

const PostList: React.FC<PostListProps> = props => {
  return (
    <>
      {props.posts.map(item => (
        <PostsItem key={item.id} post={item} deleteHandler={props.deleteHandler} />
      ))}
    </>
  )
}

export default PostList
