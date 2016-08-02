import { combineReducers } from 'redux'

import scenarios from './scenarios'
import scenarioActions from './actions'
import courses from './courses'
import tags from './tags'

export default combineReducers({
  scenarios,
  scenarioActions,
  courses,
  tags,
})
