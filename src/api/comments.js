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
