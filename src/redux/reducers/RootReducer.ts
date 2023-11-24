// rootReducer.js
import { combineReducers } from 'redux'
import errorReducer from './ErrorReducer'

const rootReducer = combineReducers({
  error: errorReducer
})

export default rootReducer
