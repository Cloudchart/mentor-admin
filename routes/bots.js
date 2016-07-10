import multer from 'multer'
import { Router } from 'express'

import { getFilteredAttrs, handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Bot } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['name', 'isActive', 'keys']


// helpers
//
function getAttrs(body) {
  let attrs = getFilteredAttrs(body, permittedAttrs)
  attrs.isActive = !!body.isActive
  return attrs
}

// actions
//
router.get('/', async (req, res, next) => {
  Bot.run().then(bots => {
    res.render('bots', { title: `${appName} – Bots`, bots: bots })
  }).error(error => {
    res.status(500).render('error', { message: error, error: {} })
  })
})

router.post('/', (req, res, next) => {
  Bot.filter({ name: '' }).then(result => {
    if (result.length === 0) {
      const bot = new Bot({})
      bot.save().then(result => {
        res.json(result)
      }).error(handleThinkyError(res))
    } else {
      res.json(result[0])
    }
  }).error(handleThinkyError(res))
})

router.put('/:id', upload.array(), (req, res, next) => {
  Bot.get(req.params.id).update(getAttrs(req.body)).run().then(result => {
    res.json(result)
  }).error(handleThinkyError(res))
})

router.delete('/:id', (req, res, next) => {
  Bot.get(req.params.id).run().then(bot => {
    bot.delete().then(result => {
      res.json({ message: 'ok' })
    }).error(handleThinkyError(res))
  }).error(handleThinkyError(res))
})


export default router
