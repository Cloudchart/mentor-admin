function createBlock(item, action) {
  return Object.assign(item.card, { blocks: item.card.blocks.concat(action.item) })
}

function updateBlock(item, action) {
  return Object.assign(item.card, {
    blocks: item.card.blocks.map(block => block.id === action.id ? action.item : block)
  })
}

function deleteBlock(item, action) {
  return Object.assign(item.card, {
    blocks: item.card.blocks.filter(block => block.id !== action.id)
  })
}


export default function (state = [], action) {
  switch (action.type) {
    case 'GET_CARDS_RECEIVE':
      return action.items
    case 'CREATE_CARD_RECEIVE':
      return state.concat(action.item)
    case 'DELETE_CARD_RECEIVE':
      return state.filter(item => item.id !== action.id)
    case 'UPDATE_CARD_RECEIVE':
      return state.map(item => item.id === action.id ?
        Object.assign(action.item, { isFetching: false }) :
        item
      )
    case 'UPDATE_CARD_ERROR':
      return state.map(item => item.id === action.id ?
        Object.assign(item, { isFetching: false, error: action.error }) :
        item
      )
    case 'CREATE_BLOCK_RECEIVE':
      return state.map(item => item.card.id === action.item.cardId ?
        Object.assign(item, { card: createBlock(item, action) }) :
        item
      )
    case 'UPDATE_BLOCK_RECEIVE':
      return state.map(item => item.card.id === action.item.cardId ?
        Object.assign(item, { card: updateBlock(item, action) }) :
        item
      )
    case 'DELETE_BLOCK_RECEIVE':
      return state.map(item => item.card.id === action.item.cardId ?
        Object.assign(item, { card: deleteBlock(item, action) }) :
        item
      )
    default:
      return state
  }
}
