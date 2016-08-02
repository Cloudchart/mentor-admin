export default function (state = [], action) {
  switch (action.type) {
    case 'CREATE_BOT_OWNER_RECEIVE':
      return state.concat(action.item)
    case 'DELETE_BOT_OWNER_RECEIVE':
      return state.filter(item => item.id !== action.id)
    case 'UPDATE_BOT_OWNER_RECEIVE':
      return state.map(item => item.id === action.id ?
        Object.assign(action.item, { isFetching: false }) :
        item
      )
    case 'UPDATE_BOT_OWNER_ERROR':
      return state.map(item => item.id === action.id ?
        Object.assign(item, { isFetching: false, error: action.error }) :
        item
      )
    default:
      return state
  }
}
