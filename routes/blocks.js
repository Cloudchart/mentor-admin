import multer from 'multer'
import { Router } from 'express'

import { _handleThinkyError, getFilteredAttrs } from './helpers'
import { Card, r } from '../models'

const router = Router({ mergeParams: true })
const upload = multer()
const permittedAttrs = ['position', 'type', 'url', 'text']


// helpers
//
function getResponse(result) {
  return result.changes.length > 0 ? result.changes[0].new_val : {}
}

// actions
//
router.post('/', async (req, res, next) => {
  try {
    const result = await r.table('insights')
      .get(req.params.cardId)
      .update({
        blocks: r.row('blocks').append({ id: r.uuid(), position: 0, type: 'text' })
      }, { returnChanges: true, nonAtomic: true })
      .run()

    res.json(getResponse(result))
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/:id', upload.array(), async (req, res, next) => {
  try {
    const attrs = getFilteredAttrs(req.body, permittedAttrs)

    const result = await r.table('insights')
      .get(req.params.cardId)
      .update({
        blocks: r.row('blocks').map(block => {
          return r.branch(block('id').eq(req.params.id), block.merge(attrs), block)
        })
      }, { returnChanges: true })
      .run()

    res.json(getResponse(result))
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await r.table('insights')
      .get(req.params.cardId)
      .update({
        blocks: r.row('blocks').filter(block => block('id').ne(req.params.id))
      }, { returnChanges: true })
      .run()

    res.json(getResponse(result))
  } catch (err) {
    _handleThinkyError(err, res)
  }
})


export default router
