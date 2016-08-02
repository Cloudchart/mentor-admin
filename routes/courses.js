import multer from 'multer'
import { Router } from 'express'

import { getFilteredAttrs, _handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Bot, Course, Scenario, Card } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['name', 'author', 'insights', 'scenario']

// actions
//
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.run()
    const tags = await Card.concatMap(card => card('tags')).distinct().execute()
    const scenarios = await Scenario.filter(scenario => scenario.hasFields('type'))

    res.render('courses', { title: `${appName} – Courses`,
      courses: courses,
      scenarios: scenarios,
      tags: tags,
    })
  } catch (err) {
    res.status(500).render('error', { message: err, error: {} })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const courses = await Course.filter(item => item.hasFields('name').not())

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
    const item = await Course.get(req.params.id)
    const attrs = getFilteredAttrs(req.body, permittedAttrs)
    const result = await item.merge(attrs).save()
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await Course.get(req.params.id)
    await item.delete()
    res.json({ message: 'ok' })
  } catch (err) {
    _handleThinkyError(err, res)
  }
})


export default router
