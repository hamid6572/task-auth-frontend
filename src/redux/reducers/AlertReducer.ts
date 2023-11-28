import { CLEAR_ALERT, SET_ALERT } from '../actions/ActionsTypes'

const initialState = {
  message: ''
}

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        message: action.payload
      }
    case CLEAR_ALERT:
      return {
        ...state,
        message: ''
      }
    default:
      return state
  }
}

export default alertReducer
