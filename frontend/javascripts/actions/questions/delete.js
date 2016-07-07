import fetch from 'isomorphic-fetch'


function requestDeleteQuestion(id) {
  return {
    type: 'DELETE_QUESTION_REQUEST',
    id,
  }
}

function receiveDeleteQuestion(id, json) {
  return {
    type: 'DELETE_QUESTION_RECEIVE',
    id,
    receivedAt: Date.now()
  }
}

function catchDeleteQuestionError(id, error) {
  return {
    type: 'DELETE_QUESTION_ERROR',
    id,
    error: error,
    receivedAt: Date.now()
  }
}

function deleteQuestion(id) {
  return function (dispatch) {
    dispatch(requestDeleteQuestion(id))

    return fetch(`/questions/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return dispatch(catchDeleteQuestionError(id, json.error))
      } else {
        return dispatch(receiveDeleteQuestion(id, json))
      }
    }).catch(error => {
      return dispatch(catchDeleteQuestionError(id, error))
    })
  }
}


export default deleteQuestion
