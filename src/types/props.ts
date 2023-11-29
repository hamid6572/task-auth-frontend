import { ReactNode } from 'react'
import { Post } from './post'
import { Comment, Reply } from './comment'
import { Socket } from 'socket.io-client'

export type PostItemProps = {
  post: Post
  deleteHandler: (id: number) => void
}

export type PostListProps = {
  posts: Post[]
  deleteHandler: (id: number) => void
}

export type CommentListProps = {
  comments: Comment[]
}

export type CommentItemProps = {
  comment: Comment
}

export type AddReplyProps = {
  postId: number
  commentId: number
  setReplies: React.Dispatch<React.SetStateAction<Reply[]>>
}

export type LoginProps = {
  signInHandler: (data) => void
}

export type SignupProps = {
  signupHandler: (data) => void
}

export type AddCommentProps = {
  post: Post
  socket: Socket | undefined
}

export type PostProps = {
  isEdit?: boolean
}
