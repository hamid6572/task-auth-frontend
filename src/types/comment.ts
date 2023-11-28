import { Post } from './post'
import { User } from './user'

export type Comment = {
  id: number
  text: string
  post: Post
  user: User
  replies: Comment[]
}

export type Reply = {
  id: number
  text: string
  post: Post
  user: User
  replies: Comment[]
}
