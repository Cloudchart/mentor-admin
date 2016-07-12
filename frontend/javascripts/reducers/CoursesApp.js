import { combineReducers } from 'redux'

import bots from './bots'
import courses from './courses'
import scenarios from './scenarios'

export default combineReducers({
  bots,
  courses,
  scenarios,
})
