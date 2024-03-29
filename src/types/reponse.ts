import { Reply } from './comment'
import { Post } from './post'
import { User } from './user'

export type SignupResponse = {
  register: {
    token: string
    user: {
      id: string
    }
  }
}

export type LoginResponse = {
  login: {
    token: string
    user: {
      id: string
    }
  }
}

export type CreatePostResponse = {
  createPost: {
    message: string
    id: number
  }
}

export type EditPostResponse = {
  updatePost: {
    message: string
    id: number
  }
}

export type GetPostResponse = {
  getPost: {
    id: number
    title: string
    content: string
    user: User
    comments: {
      id: number
      text: string
    }[]
  }
}

export type DeletePostResponse = {
  deletePost: {
    message: string
  }
}

export type PaginatedPostsResponse = {
  paginatedPosts: {
    posts: {
      id: number
      title: string
      content: string
      user: {
        id: number
        firstName: string
      }
      comments: {
        id: number
        text: string
      }[]
    }[]
    total: number
  }
}

type GenericComment = {
  id: number
  text: string
  user: User
  post: Post
  replies: Reply[]
}

export type GetCommentsResponse = {
  getComment: { comments: GenericComment[] }
  total: number
}

export type GetCommentResponse = {
  Comment: GenericComment
}

export type GetCommentsRepliesResponse = {
  getRepliesOfComment: GenericComment[]
}

export type AddReplyToCommentResponse = {
  addReplyToComment: GenericComment
}

export type AddCommentResponse = {
  createComment: {
    id: number
    text: string
    user: {
      firstName: string
    }
  }
}
