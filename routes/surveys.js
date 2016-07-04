import multer from 'multer'
import { Router } from 'express'

import { handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Survey } from '../models'

const router = Router()
const upload = multer()


router.get('/', async (req, res, next) => {
  Survey.run().then(surveys => {
    res.render('surveys', { title: `${appName} – Surveys`, surveys: surveys })
  }).error(error => {
    res.status(500).render('error', { message: error, error: {} })
  })
})

router.post('/', upload.array(), (req, res, next) => {
  const survey = new Survey(Object.assign({}, req.body))
  survey.save().then(result => {
    res.json(result)
  }).error(handleThinkyError(res))
})

// router.put('/:id', (req, res, next) => {
//   Survey.findById(req.params.id).then(survey => {
//     const attrs = getFilteredAttrs(req.body, permittedAttrs)
//     survey.update(attrs).then(survey => {
//       res.json(survey)
//     }).catch(error => {
//       res.status(500).json({ error })
//     })
//   }).catch(error => {
//     res.status(404).json({ message: 'not found' })
//   })
// })

router.delete('/:id', (req, res, next) => {
  Survey.get(req.params.id).run().then(survey => {
    survey.delete().then(result => {
      res.json({ message: 'ok' })
    }).error(handleThinkyError(res))
  }).error(handleThinkyError(res))
})


export default router
