import fetch from 'isomorphic-fetch'


function requestDeleteSurvey(id) {
  return {
    type: 'DELETE_SURVEY_REQUEST',
    id,
  }
}

function receiveDeleteSurvey(id, json) {
  return {
    type: 'DELETE_SURVEY_RECEIVE',
    id,
    receivedAt: Date.now()
  }
}

function catchDeleteSurveyError(id, error) {
  return {
    type: 'DELETE_SURVEY_ERROR',
    id,
    error: error,
    receivedAt: Date.now()
  }
}

function deleteSurvey(id) {
  return function (dispatch) {
    dispatch(requestDeleteSurvey(id))

    return fetch(`/surveys/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return dispatch(catchDeleteSurveyError(id, json.error))
      } else {
        return dispatch(receiveDeleteSurvey(id, json))
      }
    }).catch(error => {
      return dispatch(catchDeleteSurveyError(id, error))
    })
  }
}


export default deleteSurvey
