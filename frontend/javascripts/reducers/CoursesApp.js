import { combineReducers } from 'redux'

import cards from './cards'
import courses from './courses'
import tags from './tags'
import scenarios from './scenarios'

export default combineReducers({
  cards,
  courses,
  tags,
  scenarios,
})
