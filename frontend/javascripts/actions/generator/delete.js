import fetch from 'isomorphic-fetch'


function requestDeleteItem(modelName, id) {
  return {
    type: `DELETE_${modelName.toUpperCase()}_REQUEST`,
    id,
  }
}

function receiveDeleteItem(modelName, id, item) {
  return {
    type: `DELETE_${modelName.toUpperCase()}_RECEIVE`,
    id,
    item,
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

function deleteItem(modelName, options, id) {
  return function (dispatch) {
    let path = `/${modelName}s/${id}`
    if (options.parentModelName) {
      path = `/${options.parentModelName}_${modelName}s/${id}`
    }

    dispatch(requestDeleteItem(modelName, id))

    return fetch(path, {
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


export default function (modelName, options={}) {
  return (id) => deleteItem(modelName, options, id)
}
