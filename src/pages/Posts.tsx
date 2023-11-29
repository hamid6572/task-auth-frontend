import React from 'react'
import PostsList from '../components/posts/PostsList'
import { PostListProps } from '../types'

const Posts: React.FC<PostListProps> = ({ state }) => <PostsList state={state} />

export default Posts
