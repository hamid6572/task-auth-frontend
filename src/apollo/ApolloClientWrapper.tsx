import React, { ReactNode, useContext, FC } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { ErrorContext } from '../context/ErrorProvider'

type ApolloWrapperProps = {
  children: ReactNode
}

const ApolloClientWrapper: FC<ApolloWrapperProps> = ({ children }) => {
  const { handleError } = useContext(ErrorContext)

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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors)

      graphQLErrors.forEach(({ message }) => {
        console.log(message)

        handleError(`GraphQL Error: ${message}`)
      })
    }

    if (networkError) handleError(`Network Error: ${networkError}`)

    //    return forward(operation)
  })

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || '',
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, link])
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientWrapper
