import { ReactNode } from 'react'
import { Socket } from 'socket.io-client'

import { Post } from './post'
import { Comment, Reply } from './comment'

export type PostItemProps = {
  post: Post
  deleteHandler: (id: number) => void
}

export type CommentListProps = {
  comments: Comment[]
  isSearched?: boolean
}

export type CommentItemProps = {
  comment: Comment
  isSearched?: boolean
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

export type ErrorContextProps = {
  error: string | null
  handleError: (errorMessage: string) => void
  clearError: () => void
}

export type ErrorProviderProps = {
  children: ReactNode
}

export type PostListProps = {
  state: {
    post: Post
  }
}
