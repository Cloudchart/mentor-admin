import fetch from 'isomorphic-fetch'


function requestUpdateItem(modelName, id) {
  return {
    type: `UPDATE_${modelName.toUpperCase()}_REQUEST`,
    id,
  }
}

function receiveUpdateItem(modelName, id, item) {
  return {
    type: `UPDATE_${modelName.toUpperCase()}_RECEIVE`,
    id,
    item,
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

function updateItem(modelName, options, id, data) {
  return function (dispatch) {
    let path = `/${modelName}s/${id}`
    if (options.parentModelName) {
      path = `/${options.parentModelName}_${modelName}s/${id}`
    }

    let headers = {}
    if (data.tagName === 'FORM') {
      data = new FormData(data)
    } else {
      data = JSON.stringify(data)
      headers['Content-Type'] = 'application/json'
    }

    dispatch(requestUpdateItem(modelName, id))

    return fetch(path, {
      method: 'PUT',
      body: data,
      credentials: 'same-origin',
      headers: headers,
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


export default function update(modelName, options={}) {
  return (id, data) => updateItem(modelName, options, id, data)
}
