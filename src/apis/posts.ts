import { gql } from '@apollo/client'

export const CreatePostMutation = gql`
  mutation CreatePost($input: postInput!) {
    createPost(data: $input) {
      message
      id
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

export const GetPaginatedPostsQuery = gql`
  query PaginatedPosts($page: Int!, $itemsPerPage: Int!) {
    paginatedPosts(page: $page, itemsPerPage: $itemsPerPage) {
      posts {
        user {
          lastName
          firstName
          id
        }
        title
        content
        id
        comments {
          id
          text
        }
      }
      total
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
      id
      title
      content
    }
  }
`

export const GetPostQuery = gql`
  query GetPost($id: Int!) {
    getPost(id: $id) {
      id
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
  mutation UpdatePost($id: Int!, $input: postInput!) {
    updatePost(id: $id, data: $input) {
      message
      id
    }
  }
`

export const DeletePostMutation = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id) {
      message
    }
  }
`
