import multer from 'multer'
import { Router } from 'express'

import { getFilteredAttrs, _handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Bot, BotOwner, Scenario } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['name', 'type', 'token', 'scenario', 'bot_owner']


router.get('/', async (req, res, next) => {
  try {
    const bots = await Bot.run()
    const scenarios = await Scenario.filter(item => item.hasFields('type'))
    const bot_owners = await BotOwner.filter(item => item.hasFields('name'))

    res.render('bots', { title: `${appName} – Bots`,
      bots: bots,
      scenarios: scenarios,
      bot_owners: bot_owners,
    })
  } catch (err) {
    res.status(500).render('error', { message: err, error: {} })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const bot = new Bot({})
    const result = await bot.save()
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/:id', upload.array(), async (req, res, next) => {
  try {
    const item = await Bot.get(req.params.id)
    const attrs = getFilteredAttrs(req.body, permittedAttrs)
    const result = await item.merge(attrs).save()
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await Bot.get(req.params.id)
    await item.delete()
    res.json({ message: 'ok' })
  } catch (err) {
    _handleThinkyError(err, res)
  }})


export default router
