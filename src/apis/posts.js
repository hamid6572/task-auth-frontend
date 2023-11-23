import { gql } from '@apollo/client'

export const CreatePostMutation = gql`
  mutation CreatePost($input: postInput!) {
    createPost(data: $input) {
      message
    }
  }
`

export const GetPostsQuery = gql`
  query {
    listPosts {
      id
      title
      content
      user {
        id
        firstName
      }
      comments {
        text
      }
    }
  }
`

export const GlobalSearchQuery = gql`
  query Search($input: String!) {
    search(input: $input) {
      user {
        lastName
        firstName
        id
      }
      comments {
        id
        text
      }
      id
      title
      content
    }
  }
`

export const GetPostQuery = gql`
  query GetPost($id: Float!) {
    getPost(id: $id) {
      title
      content
      user {
        firstName
      }
      comments {
        id
        text
      }
    }
  }
`

export const EditPostMutation = gql`
  mutation UpdatePost($id: Float!, $input: postInput!) {
    updatePost(id: $id, data: $input) {
      message
    }
  }
`

export const DeletePostMutation = gql`
  mutation DeletePost($id: Float!) {
    deletePost(id: $id) {
      message
    }
  }
`
