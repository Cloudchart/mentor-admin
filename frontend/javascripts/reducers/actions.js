export default function (state = [], action) {
  switch (action.type) {
    case 'GET_ACTIONS_RECEIVE':
      return action.items
    case 'CREATE_ACTION_RECEIVE':
      return state.concat(action.item)
    case 'DELETE_ACTION_RECEIVE':
      return state.filter(item => item.id !== action.id)
    case 'UPDATE_ACTION_RECEIVE':
      return state.map(item => item.id === action.id ?
        Object.assign(action.item, { isFetching: false }) :
        item
      )
    case 'UPDATE_ACTION_ERROR':
      return state.map(item => item.id === action.id ?
        Object.assign(item, { isFetching: false, error: action.error }) :
        item
      )
    default:
      return state
  }
}
