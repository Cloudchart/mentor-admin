import { combineReducers } from 'redux'

import surveys from './surveys'
import questions from './questions'

export default combineReducers({
  surveys,
  questions,
})
