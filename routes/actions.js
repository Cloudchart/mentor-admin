import multer from 'multer'
import { Router } from 'express'

import { _handleThinkyError, getFilteredAttrs } from './helpers'
import { Scenario, ScenarioAction } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['label', 'action', 'scenarioId', 'text', 'next', 'timeout', 'branch']


// helpers
//

// actions
//
router.post('/scenarios/:scenarioId/actions', async (req, res, next) => {
  try {
    const scenario = await Course.get(req.params.scenarioId)
    res.json({})
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/scenario_actions/:id', upload.array(), async (req, res, next) => {
  try {
    const attrs = getFilteredAttrs(req.body, permittedAttrs)
    res.json({})
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.delete('/scenario_actions/:id', async (req, res, next) => {
  try {
    res.json({ message: 'ok' })
  } catch (err) {
    _handleThinkyError(err, res)
  }
})


export default router
