import { combineReducers } from 'redux'

import scenarios from './scenarios'
import scenarioActions from './actions'

export default combineReducers({
  scenarios,
  scenarioActions,
})
