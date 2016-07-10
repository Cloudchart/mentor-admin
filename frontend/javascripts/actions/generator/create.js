import fetch from 'isomorphic-fetch'


function requestCreateItem(modelName) {
  return {
    type: `CREATE_${modelName.toUpperCase()}_REQUEST`,
  }
}

function receiveCreateItem(modelName, json) {
  return {
    type: `CREATE_${modelName.toUpperCase()}_RECEIVE`,
    item: json,
    receivedAt: Date.now()
  }
}

function catchCreateItemError(modelName, error) {
  return {
    type: `CREATE_${modelName.toUpperCase()}_ERROR`,
    error: error,
    receivedAt: Date.now()
  }
}

function createItem(modelName) {
  return function (dispatch) {
    dispatch(requestCreateItem(modelName))

    return fetch(`/${modelName}s`, {
      method: 'POST',
      credentials: 'same-origin',
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return dispatch(catchCreateItemError(modelName, json.error))
      } else {
        return dispatch(receiveCreateItem(modelName, json))
      }
    }).catch(error => {
      return dispatch(catchCreateItemError(modelName, error))
    })
  }
}


export default function create(modelName) {
  return () => createItem(modelName)
}
