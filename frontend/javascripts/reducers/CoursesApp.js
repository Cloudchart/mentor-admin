import { combineReducers } from 'redux'

import cards from './cards'
import courses from './courses'
import tags from './tags'
import scenarios from './scenarios'
import bot_owners from './bot_owners'

export default combineReducers({
  cards,
  courses,
  tags,
  scenarios,
  bot_owners,
})
