import multer from 'multer'
import uuid from 'node-uuid'
import { Router } from 'express'

import { getFilteredAttrs, handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Bot, Scenario } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['name', 'isActive', 'keys', 'scenarioId']


// helpers
//
function getAttrs(body) {
  let attrs = getFilteredAttrs(body, permittedAttrs)
  attrs.name = body.name || null
  attrs.isActive = !!body.isActive
  return attrs
}

function getDefaultValues() {
  return {
    keys: {
      facebookVerificationKey: uuid.v4()
    }
  }
}

// actions
//
router.get('/', async (req, res, next) => {
  Scenario.filter(scenario => scenario.hasFields('name')).then(scenarios => {
    Bot.run().then(bots => {
      res.render('bots', { title: `${appName} – Bots`,
        bots: bots,
        scenarios: scenarios,
      })
    }).error(error => {
      res.status(500).render('error', { message: error, error: {} })
    })
  }).error(error => {
    res.status(500).render('error', { message: error, error: {} })
  })
})

router.post('/', (req, res, next) => {
  Bot.filter(item => item.hasFields('name').not()).then(result => {
    if (result.length === 0) {
      const bot = new Bot(getDefaultValues())
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
