import { combineReducers } from 'redux'

import bots from './bots'
import scenarios from './scenarios'

export default combineReducers({
  bots,
  scenarios,
})
