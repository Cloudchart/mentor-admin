import fetch from 'isomorphic-fetch'


function requestDeleteItem(modelName, id) {
  return {
    type: `DELETE_${modelName.toUpperCase()}_REQUEST`,
    id,
  }
}

function receiveDeleteItem(modelName, id, json) {
  return {
    type: `DELETE_${modelName.toUpperCase()}_RECEIVE`,
    id,
    receivedAt: Date.now()
  }
}

function catchDeleteItemError(modelName, id, error) {
  return {
    type: `DELETE_${modelName.toUpperCase()}_ERROR`,
    id,
    error: error,
    receivedAt: Date.now()
  }
}

function deleteItem(modelName, id) {
  return function (dispatch) {
    dispatch(requestDeleteItem(modelName, id))

    return fetch(`/${modelName}s/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return dispatch(catchDeleteItemError(modelName, id, json.error))
      } else {
        return dispatch(receiveDeleteItem(modelName, id, json))
      }
    }).catch(error => {
      return dispatch(catchDeleteItemError(modelName, id, error))
    })
  }
}


export default function (modelName) {
  return (id) => deleteItem(modelName, id)
}
