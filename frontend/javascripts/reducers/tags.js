export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_CARD_RECEIVE':
    case 'UPDATE_ACTION_RECEIVE':
      return [...new Set(state.concat(action.item.tags))]
    default:
      return state
  }
}
