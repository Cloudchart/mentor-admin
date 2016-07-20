import fetch from 'isomorphic-fetch'


function requestImportCards() {
  return {
    type: 'IMPORT_CARDS_REQUEST',
  }
}

function receiveImportCards(courseId, items) {
  return {
    type: 'IMPORT_CARDS_RECEIVE',
    courseId,
    items: items,
    receivedAt: Date.now()
  }
}

function catchImportCardsError(error) {
  return {
    type: 'IMPORT_CARDS_ERROR',
    error: error,
    receivedAt: Date.now()
  }
}

function importCards(courseId, data) {
  return function (dispatch) {
    dispatch(requestImportCards())

    return fetch(`/courses/${courseId}/cards/import`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return dispatch(catchImportCardsError(json.error))
      } else {
        return dispatch(receiveImportCards(courseId, json))
      }
    }).catch(error => {
      return dispatch(catchImportCardsError(error))
    })
  }
}


export default importCards
