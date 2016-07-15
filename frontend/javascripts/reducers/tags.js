import uniqBy from 'lodash/uniqBy'

export default function (state = [], action) {
  switch (action.type) {
    case 'CREATE_TAG_RECEIVE':
      return uniqBy(state.concat(action.item), 'id')
    case 'UPDATE_TAG_REQUEST':
      return state.map(item => item.id === action.id ?
        Object.assign(item, { isFetching: true }) :
        item
      )
    case 'UPDATE_TAG_RECEIVE':
      return state.map(item => item.id === action.id ?
        Object.assign(action.item, { isFetching: false }) :
        item
      )
    case 'UPDATE_TAG_ERROR':
      return state.map(item => item.id === action.id ?
        Object.assign(item, { isFetching: false, error: action.error }) :
        item
      )
    case 'DELETE_TAG_RECEIVE':
      return state.filter(item => item.id !== action.id)
    default:
      return state
  }
}
