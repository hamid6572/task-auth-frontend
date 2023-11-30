import React from 'react'

import './App.css'
import Routes from './routes/routes'

import { ErrorProvider } from './context/ErrorProvider'
import GlobalSnackbar from './components/GlobalSnackbar'
import ApolloClientWrapper from './apollo/ApolloClientWrapper'

const App: React.FC = () => {
  return (
    <ErrorProvider>
      <ApolloClientWrapper>
        <Routes />
        <GlobalSnackbar />
      </ApolloClientWrapper>
    </ErrorProvider>
  )
}

export default App
