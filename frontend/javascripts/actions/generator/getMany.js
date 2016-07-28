import fetch from 'isomorphic-fetch'


function requestGetItems(modelName) {
  return {
    type: `GET_${modelName.toUpperCase()}S_REQUEST`,
  }
}

function receiveGetItems(modelName, parentId, items) {
  return {
    type: `GET_${modelName.toUpperCase()}S_RECEIVE`,
    parentId,
    items,
    receivedAt: Date.now()
  }
}

function catchGetItemsErrors(modelName, error) {
  return {
    type: `GET_${modelName.toUpperCase()}S_ERROR`,
    error: error,
    receivedAt: Date.now()
  }
}

function getItems(modelName, options, parentId) {
  let path = `/${modelName}s`
  if (options.parentModelName) {
    path = `/${options.parentModelName}s/${parentId}/${modelName}s`
  }

  return function (dispatch) {
    dispatch(requestGetItems(modelName))

    return fetch(path, {
      method: 'GET',
      credentials: 'same-origin',
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return dispatch(catchGetItemsErrors(modelName, json.error))
      } else {
        return dispatch(receiveGetItems(modelName, parentId, json))
      }
    }).catch(error => {
      return dispatch(catchGetItemsErrors(modelName, error))
    })
  }
}


export default function getMany(modelName, options={}) {
  return (parentId=null) => getItems(modelName, options, parentId)
}
