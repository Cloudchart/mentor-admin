import multer from 'multer'
import { Router } from 'express'

import { _handleThinkyError, getFilteredAttrs } from './helpers'
import { Card_Course, Block } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['position', 'type', 'content']


router.post('/cards/:cardCourseId/blocks', async (req, res, next) => {
  try {
    const cardCourse = await Card_Course.get(req.params.cardCourseId)
    const block = new Block({ cardId: cardCourse.cardId })
    const result = await block.save()
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/card_blocks/:id', upload.array(), async (req, res, next) => {
  try {
    let attrs = getFilteredAttrs(req.body, permittedAttrs)
    const result = await Block.get(req.params.id).update(attrs)
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.delete('/card_blocks/:id', async (req, res, next) => {
  try {
    const block = await Block.get(req.params.id)
    await block.delete()
    res.json(block)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})


export default router
