import multer from 'multer'
import { Router } from 'express'

import { _handleThinkyError, getFilteredAttrs } from './helpers'
import { Card, Block } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['position', 'type', 'url', 'text']


router.post('/cards/:cardId/blocks', async (req, res, next) => {
  try {
    const card = await Card.get(req.params.cardId)
    const block = new Block({ cardId: card.id })
    const result = await block.save()

    card.blocks = card.blocks.concat(block)
    card.save()

    res.json(block)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/card_blocks/:id', upload.array(), async (req, res, next) => {
  try {
    const block = await Block.get(req.params.id)
    const attrs = getFilteredAttrs(req.body, permittedAttrs)
    const result = await block.merge(attrs).save()

    const card = await Card.get(result.cardId)
    card.blocks = card.blocks.map(block => block.id === result.id ? result : block)
    card.save()

    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.delete('/card_blocks/:id', async (req, res, next) => {
  try {
    const result = await Block.get(req.params.id)
    await result.delete()

    const card = await Card.get(result.cardId)
    card.blocks = card.blocks.filter(block => block.id !== result.id)
    card.save()

    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})


export default router
