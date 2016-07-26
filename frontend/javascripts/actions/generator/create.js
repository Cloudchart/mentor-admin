import fetch from 'isomorphic-fetch'


function requestCreateItem(modelName) {
  return {
    type: `CREATE_${modelName.toUpperCase()}_REQUEST`,
  }
}

function receiveCreateItem(modelName, parentId, item) {
  return {
    type: `CREATE_${modelName.toUpperCase()}_RECEIVE`,
    item,
    parentId,
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

function createItem(modelName, options, parentId) {
  let path = `/${modelName}s`
  if (options.parentModelName) {
    path = `/${options.parentModelName}s/${parentId}/${modelName}s`
  }

  return function (dispatch) {
    dispatch(requestCreateItem(modelName))

    return fetch(path, {
      method: 'POST',
      credentials: 'same-origin',
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return dispatch(catchCreateItemError(modelName, json.error))
      } else {
        return dispatch(receiveCreateItem(modelName, parentId, json))
      }
    }).catch(error => {
      return dispatch(catchCreateItemError(modelName, error))
    })
  }
}


export default function create(modelName, options={}) {
  return (parentId=null) => createItem(modelName, options, parentId)
}
