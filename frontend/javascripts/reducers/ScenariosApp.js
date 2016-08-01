import { combineReducers } from 'redux'

import scenarios from './scenarios'
import scenarioActions from './actions'
import courses from './courses'

export default combineReducers({
  scenarios,
  scenarioActions,
  courses,
})
