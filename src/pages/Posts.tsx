import React from 'react'
import { PostListProps } from '../types'
import PostList from 'components/posts/PostList'

const Posts: React.FC<PostListProps> = ({ state }) => <PostList state={state} />

export default Posts
