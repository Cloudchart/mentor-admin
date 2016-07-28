import uniqBy from 'lodash/uniqBy'

function importCards(item, action) {
  return { insights: item.insights.concat(action.items.map(i => { return { id: i.id } })) }
}

export default function (state = [], action) {
  switch (action.type) {
    case 'CREATE_COURSE_RECEIVE':
      return uniqBy(state.concat(action.item), 'id')
    case 'UPDATE_COURSE_RECEIVE':
      return state.map(item => item.id === action.id ?
        Object.assign(action.item, { isFetching: false }) :
        item
      )
    case 'UPDATE_COURSE_ERROR':
      return state.map(item => item.id === action.id ?
        Object.assign(item, { isFetching: false, error: action.error }) :
        item
      )
    case 'DELETE_COURSE_RECEIVE':
      return state.filter(item => item.id !== action.id)
    case 'CREATE_CARD_RECEIVE':
      return state.map(item => item.id === action.parentId ?
        Object.assign(item, { insights: item.insights.concat({ id: action.item.id }) }) :
        item
      )
    case 'IMPORT_CARDS_RECEIVE':
      return state.map(item => item.id === action.courseId ?
        Object.assign(item, importCards(item, action)) :
        item
      )
    default:
      return state
  }
}
