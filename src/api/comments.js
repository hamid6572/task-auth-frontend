import { gql } from '@apollo/client'

export const CreatePostMutation = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(data: $input) {
      message
    }
  }
`

export const GetCommentsQuery = gql`
  query GetComment($postId: Float!, $page: Int!, $itemsPerPage: Int!) {
    getComment(postId: $postId, page: $page, itemsPerPage: $itemsPerPage) {
      id
      text
      user {
        firstName
      }
      post {
        id
        title
        content
      }
      replies {
        id
        text
        replies {
          id
          text
        }
      }
    }
  }
`

export const GetCommentsRepliesQuery = gql`
  query GetRepliesOfComment($commentId: Float!, $page: Int!, $itemsPerPage: Int!) {
    getRepliesOfComment(commentId: $commentId, page: $page, itemsPerPage: $itemsPerPage) {
      id
      text
      user {
        firstName
      }
      post {
        id
        title
        content
      }
      replies {
        id
        text
        replies {
          id
          text
        }
      }
    }
  }
`

export const AddCommentMutation = gql`
  mutation AddComment($text: String!, $postId: Float!) {
    createComment(data: { text: $text, postId: $postId }) {
      id
      text
      user {
        firstName
      }
      post {
        id
        title
        content
      }
      replies {
        id
        text
        replies {
          id
          text
        }
      }
    }
  }
`

export const AddReplyToCommentMutation = gql`
  mutation AddReplyToComment($text: String!, $postId: Float!, $commentId: Float!) {
    addReplyToComment(data: { text: $text, postId: $postId, commentId: $commentId }) {
      id
      text
    }
  }
`
