import fetch from 'isomorphic-fetch'


function requestGetQuestions(surveyId) {
  return {
    type: 'GET_QUESTIONS_REQUEST',
    surveyId,
  }
}

function receiveGetQuestions(surveyId, json) {
  return {
    type: 'GET_QUESTIONS_RECEIVE',
    surveyId,
    questions: json,
    receivedAt: Date.now()
  }
}

function catchGetQuestionErrors(surveyId, error) {
  return {
    type: 'GET_QUESTIONS_ERROR',
    surveyId,
    error: error,
    receivedAt: Date.now()
  }
}

function getQuestions(surveyId) {
  return function (dispatch) {
    dispatch(requestGetQuestions())

    return fetch(`/surveys/${surveyId}/questions`, {
      method: 'GET',
      credentials: 'same-origin',
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return dispatch(catchGetQuestionErrors(surveyId, json.error))
      } else {
        return dispatch(receiveGetQuestions(surveyId, json))
      }
    }).catch(error => {
      return dispatch(catchGetQuestionErrors(surveyId, error))
    })
  }
}


export default getQuestions
