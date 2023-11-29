import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

const link = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  }
})
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.log(err)

      switch (err.message) {
        case 'UNAUTHENTICATED':
          console.log(err)

          const oldHeaders = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: localStorage.getItem('token')
            }
          })
        // return forward(operation)
      }
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([errorLink, authLink, link]),
  cache: new InMemoryCache()
})
export default client
