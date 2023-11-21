const BASE_URL = 'http://localhost:8080/posts'

export const CreatePostAPI = post =>
  fetch(`${BASE_URL}/`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })

export const AllPostsAPI = () =>
  fetch(`${BASE_URL}/all`, {
    method: 'Get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  })

export const AllDraftsAPI = () =>
  fetch(`${BASE_URL}/drafts/?userId=${localStorage.getItem('userId')}`, {
    method: 'Get',
    headers: { 'x-access-token': localStorage.getItem('token') }
  })

export const getPostAPI = id =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })

export const editPostAPI = (id, post) =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })

export const publishDraftAPI = draftid =>
  fetch(`${BASE_URL}/${draftid}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })

export const DeletePostAPI = id =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  })

import { gql } from '@apollo/client'

export const CreatePostMutation = gql`
  mutation CreatePost($input: PostInput!) {
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

export const getPostQuery = gql`
  query GetPost($id: ID!) {
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
  mutation UpdatePost($id: ID!, $input: PostInput!) {
    updatePost(id: $id, data: $input) {
      message
    }
  }
`

export const DeletePostMutation = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      message
    }
  }
`
