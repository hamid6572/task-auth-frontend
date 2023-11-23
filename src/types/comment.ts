import { Post } from './post'
import { User } from './user'

export type comment = {
  id: number
  text: string
  post: Post
  user: User
  replies: comment[]
}
