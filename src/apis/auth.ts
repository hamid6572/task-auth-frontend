import { gql } from '@apollo/client'

export const SignupMutation = gql`
  mutation Register($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    register(
      createUser: { email: $email, firstName: $firstName, lastName: $lastName, password: $password }
    ) {
      token
      user {
        id
      }
    }
  }
`
export const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginData: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`
export const UserQuery = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      firstName
      posts {
        title
      }
    }
  }
`
