import fetch from 'isomorphic-fetch'


function requestUpdateItem(modelName, id) {
  return {
    type: `UPDATE_${modelName.toUpperCase()}_REQUEST`,
    id,
  }
}

function receiveUpdateItem(modelName, id, json) {
  return {
    type: `UPDATE_${modelName.toUpperCase()}_RECEIVE`,
    id,
    item: json,
    receivedAt: Date.now()
  }
}

function catchUpdateItemError(modelName, id, error) {
  return {
    type: `UPDATE_${modelName.toUpperCase()}_ERROR`,
    id,
    error,
    receivedAt: Date.now()
  }
}

function updateItem(modelName, id, form) {
  return function (dispatch) {
    dispatch(requestUpdateItem(modelName, id))

    return fetch(`/${modelName}s/${id}`, {
      method: 'PUT',
      body: new FormData(form),
      credentials: 'same-origin',
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return dispatch(catchUpdateItemError(modelName, id, json.error))
      } else {
        return dispatch(receiveUpdateItem(modelName, id, json))
      }
    }).catch(error => {
      return dispatch(catchUpdateItemError(modelName, id, error))
    })
  }
}


export default function update(modelName) {
  return (id, form) => updateItem(modelName, id, form)
}
