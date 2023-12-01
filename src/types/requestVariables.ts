export type SignupVariables = {
  email: string
  firstName: string
  lastName: string
  password: string
}

export type LoginVariables = {
  email: string
  password: string
}

export type CreatePostVariables = {
  input: {
    title: string
    content: string
  }
}

export type EditPostVariables = {
  id: number
  input: {
    title: string
    content: string
  }
}

export type GetPostVariables = {
  id: number
}

export type DeletePostVariables = {
  id: number
}

export type PaginatedPostsVariables = {
  page: number
  itemsPerPage: number
}

export type GetCommentsVariables = {
  postId: number
  page: number
  itemsPerPage: number
}

export type GetCommentVariables = {
  commentId: number
}

export type GetCommentsRepliesVariables = {
  commentId: number
  page: number
  itemsPerPage: number
}

export type AddCommentVariables = {
  text: string
  postId: number
}

export type AddReplyToCommentVariables = {
  text: string
  postId: number
  commentId: number
}
