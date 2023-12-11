import { gql } from '@apollo/client'

export const GetCommentsQuery = gql`
  query GetComment($postId: Int!, $page: Int!, $itemsPerPage: Int!) {
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

export const GetCommentQuery = gql`
  query Comment($commentId: Int!) {
    Comment(postId: $commentId) {
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
  query GetRepliesOfComment($commentId: Int!, $page: Int!, $itemsPerPage: Int!) {
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
  mutation AddComment($text: String!, $postId: Int!) {
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
  mutation AddReplyToComment($text: String!, $postId: Int!, $commentId: Int!) {
    addReplyToComment(data: { text: $text, postId: $postId, commentId: $commentId }) {
      id
      text
    }
  }
`
