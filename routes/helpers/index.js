export function getFilteredAttrs(attrs, permittedAttrs) {
  let filteredAttrs = {}
  Object.keys(attrs).forEach(key => {
    if (permittedAttrs.includes(key)) filteredAttrs[key] = attrs[key]
  })
  return filteredAttrs
}

export function handleThinkyError(res) {
  return error => {
    switch(error.name) {
      case 'DocumentNotFound':
        return res.status(404).json({ message: 'not found' })
      case 'ValidationError':
        return res.status(400).json({ error })
      default:
        return res.status(500).json({ error: error.message })
    }
  }
}
