import uniqBy from 'lodash/uniqBy'

export default function (state = [], action) {
  switch (action.type) {
    case 'CREATE_SCENARIO_RECEIVE':
      return uniqBy(state.concat(action.item), 'id')
    case 'UPDATE_SCENARIO_RECEIVE':
      return state.map(item => item.id === action.id ?
        Object.assign(action.item, { isFetching: false }) :
        item
      )
    case 'UPDATE_SCENARIO_ERROR':
      return state.map(item => item.id === action.id ?
        Object.assign(item, { isFetching: false, error: action.error }) :
        item
      )
    case 'DELETE_SCENARIO_RECEIVE':
      return state.filter(item => item.id !== action.id)
    case 'CREATE_ACTION_RECEIVE':
      return state.map(item => item.id === action.parentId ?
        Object.assign(item, { actions: item.actions.concat({ id: action.item.id }) }) :
        item
      )
    case 'DELETE_ACTION_RECEIVE':
      return state.map(item => item.id === action.parentId ?
        Object.assign(item, { actions: item.actions.filter(i => i.id !== action.id) }) :
        item
      )

    default:
      return state
  }
}
