export default function (state = [], action) {
  switch (action.type) {
    case 'GET_QUESTIONS_RECEIVE':
      return action.items
    case 'CREATE_QUESTION_RECEIVE':
      return state.concat(action.item)
    case 'DELETE_QUESTION_RECEIVE':
      return state.filter(item => item.id !== action.id)
    case 'UPDATE_QUESTION_RECEIVE':
      return state.map(item => item.id === action.id ?
        Object.assign(action.item, { isFetching: false }) :
        item
      )
    case 'UPDATE_QUESTION_ERROR':
      return state.map(item => item.id === action.id ?
        Object.assign(item, { isFetching: false, error: action.error }) :
        item
      )
    default:
      return state
  }
}
