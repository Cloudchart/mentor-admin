import { combineReducers } from 'redux'

import bots from './bots'
import scenarios from './scenarios'
import bot_owners from './bot_owners'

export default combineReducers({
  bots,
  scenarios,
  bot_owners,
})
