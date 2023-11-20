const BASE_URL = 'http://localhost:8080'

export const LoginAPI = userData =>
  fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    }
  })

export const SignupAPI = userData =>
  fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-type': 'application/json'
    }
  })
