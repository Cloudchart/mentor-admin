import multer from 'multer'
import { Router } from 'express'

import { _handleThinkyError, getFilteredAttrs } from './helpers'
import { Scenario, Action } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['label', 'action', 'text', 'next', 'timeout', 'branch']


router.get('/scenarios/:scenarioId/actions', async (req, res, next) => {
  try {
    const scenario = await Scenario.get(req.params.scenarioId)
    const items = await Action.getAll(...scenario.actions.map(item => item.id))
    res.json(items)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.post('/scenarios/:scenarioId/actions', async (req, res, next) => {
  try {
    const scenario = await Scenario.get(req.params.scenarioId)
    const action = new Action({})
    const result = await action.save()

    scenario.actions = scenario.actions.concat({ id: result.id })
    scenario.save()

    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/scenario_actions/:id', upload.array(), async (req, res, next) => {
  try {
    const action = await Action.get(req.params.id)
    const attrs = getFilteredAttrs(req.body, permittedAttrs)
    const result = await action.merge(attrs).save()

    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})


export default router
