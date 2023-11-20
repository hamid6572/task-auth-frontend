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
