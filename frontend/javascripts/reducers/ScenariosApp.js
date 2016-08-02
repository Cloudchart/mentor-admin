import { combineReducers } from 'redux'

import scenarios from './scenarios'
import scenarioActions from './actions'
import courses from './courses'
import tags from './tags'
import bot_owners from './bot_owners'

export default combineReducers({
  scenarios,
  scenarioActions,
  courses,
  tags,
  bot_owners,
})
