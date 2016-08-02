import multer from 'multer'
import { Router } from 'express'

import { getFilteredAttrs, _handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Scenario, Action, Course } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['type', 'actions']


router.get('/', async (req, res, next) => {
  try {
    const scenarios = await Scenario.run()
    const courses = await Course.filter(course => course.hasFields('name'))
    const tags = await Action.concatMap(action => action('tags').default([])).distinct().execute()

    res.render('scenarios', { title: `${appName} – Scenarios`,
      scenarios: scenarios,
      courses: courses,
      tags: tags,
    })
  } catch (err) {
    res.status(500).render('error', { message: err, error: {} })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const item = new Scenario({})
    const result = await item.save()
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/:id', upload.array(), async (req, res, next) => {
  try {
    const item = await Scenario.get(req.params.id)
    const attrs = getFilteredAttrs(req.body, permittedAttrs)
    const result = await item.merge(attrs).save()
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }})

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await Scenario.get(req.params.id)
    await item.delete()
    res.json({ message: 'ok' })
  } catch (err) {
    _handleThinkyError(err, res)
  }})


export default router
