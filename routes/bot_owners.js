import multer from 'multer'
import { Router } from 'express'

import { getFilteredAttrs, _handleThinkyError } from './helpers'
import { appName } from '../lib'
import { BotOwner } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['name']


router.get('/', async (req, res, next) => {
  try {
    const bot_owners = await BotOwner.run()

    res.render('bot_owners', { title: `${appName} – Bot owners`,
      bot_owners: bot_owners,
    })
  } catch (err) {
    res.status(500).render('error', { message: err, error: {} })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const item = new BotOwner({})
    const result = await item.save()
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/:id', upload.array(), async (req, res, next) => {
  try {
    const item = await BotOwner.get(req.params.id)
    const attrs = getFilteredAttrs(req.body, permittedAttrs)
    const result = await item.merge(attrs).save()
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await BotOwner.get(req.params.id)
    await item.delete()
    res.json({ message: 'ok' })
  } catch (err) {
    _handleThinkyError(err, res)
  }})


export default router
