import multer from 'multer'
import { Router } from 'express'

import { getFilteredAttrs, handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Scenario, ScenarioAction } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['name']


router.get('/', async (req, res, next) => {
  Scenario.run().then(scenarios => {
    res.render('scenarios', { title: `${appName} – Scenarios`, scenarios: scenarios })
  }).error(error => {
    res.status(500).render('error', { message: error, error: {} })
  })
})

router.post('/', (req, res, next) => {
  Scenario.filter({ name: '' }).then(result => {
    if (result.length === 0) {
      const scenario = new Scenario({})
      scenario.save().then(result => {
        res.json(result)
      }).error(handleThinkyError(res))
    } else {
      res.json(result[0])
    }
  }).error(handleThinkyError(res))
})

router.put('/:id', upload.array(), (req, res, next) => {
  const attrs = getFilteredAttrs(req.body, permittedAttrs)
  Scenario.get(req.params.id).update(attrs).run().then(result => {
    res.json(result)
  }).error(handleThinkyError(res))
})

router.delete('/:id', (req, res, next) => {
  Scenario.get(req.params.id).run().then(scenario => {
    scenario.delete().then(result => {
      res.json({ message: 'ok' })
    }).error(handleThinkyError(res))
  }).error(handleThinkyError(res))
})


export default router
