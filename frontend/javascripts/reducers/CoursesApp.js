import { combineReducers } from 'redux'

import cards from './cards'
import courses from './courses'
import tags from './tags'

export default combineReducers({
  cards,
  courses,
  tags,
})
