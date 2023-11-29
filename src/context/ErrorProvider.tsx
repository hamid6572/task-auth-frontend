import React, { createContext, FC, useReducer } from 'react'
import { ErrorContextProps, ErrorProviderProps } from '../types'
import { errorReducer } from './ErrorReducer'

export const ErrorContext = createContext<ErrorContextProps>({
  error: null,
  handleError: () => {
    //setting the error
  },
  clearError: () => {
    //clearing the error
  }
})

export const ErrorProvider: FC<ErrorProviderProps> = ({ children }) => {
  const [error, dispatchError] = useReducer(errorReducer, null)

  const handleError = (errorMessage: string) => {
    dispatchError({ type: 'SET_ERROR', payload: errorMessage })
  }

  const clearError = () => {
    dispatchError({ type: 'CLEAR_ERROR' })
  }

  return (
    <ErrorContext.Provider value={{ error, handleError, clearError }}>
      {children}
    </ErrorContext.Provider>
  )
}
