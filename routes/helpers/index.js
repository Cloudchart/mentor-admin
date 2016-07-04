export function handleThinkyError(res) {
  return error => {
    switch(error.name) {
      case 'DocumentNotFound':
        return res.status(404).json({ message: 'not found' })
      case 'ValidationError':
        return res.status(400).json({ error })
      default:
        return res.status(500).json({ error })
    }
  }
}
