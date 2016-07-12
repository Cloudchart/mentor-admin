import multer from 'multer'
import { Router } from 'express'

import { getFilteredAttrs, _handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Bot, Course, Scenario } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['name', 'isActive', 'botId', 'scenarioId']


// helpers
//
function getAttrs(body) {
  let attrs = getFilteredAttrs(body, permittedAttrs)
  if (!body.name) delete attrs.name
  attrs.isActive = !!body.isActive
  return attrs
}

// actions
//
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.run()
    const bots = await Bot.filter(item => item.hasFields('name'))
    const scenarios = await Scenario.filter(item => item.hasFields('name'))

    res.render('courses', { title: `${appName} – Courses`,
      bots: bots,
      courses: courses,
      scenarios: scenarios,
    })
  } catch (err) {
    res.status(500).render('error', { message: err, error: {} })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const courses = await Course.filter({ name: '' })

    if (courses.length === 0) {
      const item = new Course({})
      const result = await item.save()
      res.json(result)
    } else {
      res.json(courses[0])
    }
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/:id', upload.array(), async (req, res, next) => {
  try {
    const item = await Course.get(req.params.id).update(getAttrs(req.body)).run()
    res.json(item)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await Course.get(req.params.id).delete().run()
    res.json({ message: 'ok' })
  } catch (err) {
    _handleThinkyError(err, res)
  }
})


export default router
