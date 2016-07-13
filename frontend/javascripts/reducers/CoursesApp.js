import { combineReducers } from 'redux'

import bots from './bots'
import cards from './cards'
import courses from './courses'
import scenarios from './scenarios'

export default combineReducers({
  bots,
  cards,
  courses,
  scenarios,
})
