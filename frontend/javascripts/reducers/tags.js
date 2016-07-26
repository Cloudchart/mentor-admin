import uniqBy from 'lodash/uniqBy'

export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_CARD_RECEIVE':
      return uniqBy(state.concat(action.item.tags), 'id')
    default:
      return state
  }
}
