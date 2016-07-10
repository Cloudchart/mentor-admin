import uniqBy from 'lodash/uniqBy'

export default function (state = [], action) {
  switch (action.type) {
    case 'CREATE_BOT_RECEIVE':
      return uniqBy(state.concat(action.item), 'id')
    case 'UPDATE_BOT_REQUEST':
      return state.map(bot => bot.id === action.id ?
        Object.assign(bot, { isFetching: true }) :
        bot
      )
    case 'UPDATE_BOT_RECEIVE':
      return state.map(bot => bot.id === action.id ?
        Object.assign(action.item, { isFetching: false }) :
        bot
      )
    case 'UPDATE_BOT_ERROR':
      return state.map(bot => bot.id === action.id ?
        Object.assign(bot, { isFetching: false, error: action.error }) :
        bot
      )
    case 'DELETE_BOT_RECEIVE':
      return state.filter(bot => bot.id !== action.id)
    default:
      return state
  }
}
