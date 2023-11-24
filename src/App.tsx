import React from 'react'

import Routes from './routes/routes'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/reducers/RootReducer'
import ErrorSnackbar from './redux/ErrorSnackBar'

const store = createStore(rootReducer)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes />
      <ErrorSnackbar />
    </Provider>
  )
}

export default App
