// rootReducer.js
import { combineReducers } from 'redux'
import errorReducer from './ErrorReducer'
import alertReducer from './AlertReducer'

const rootReducer = combineReducers({
  error: errorReducer,
  alert: alertReducer
})

export default rootReducer
