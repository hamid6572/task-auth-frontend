import { CLEAR_ERROR, SET_ERROR } from '../actions/ActionsTypes'

const initialState = {
  errorMessage: ''
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      }
    case CLEAR_ERROR:
      return {
        ...state,
        errorMessage: ''
      }
    default:
      return state
  }
}

export default errorReducer
