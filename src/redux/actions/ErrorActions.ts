// ErrorActions.js
import { SET_ERROR, CLEAR_ERROR } from './ActionsTypes'

export const setError = (errorMessage: String) => ({
  type: SET_ERROR,
  payload: errorMessage
})

export const clearError = () => ({
  type: CLEAR_ERROR
})

export const setAlert = (message: String) => ({
  type: SET_ERROR,
  payload: message
})
