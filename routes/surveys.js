import multer from 'multer'
import { Router } from 'express'
import { slugify, titleize } from 'underscore.string'

import { handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Survey } from '../models'

const router = Router()
const upload = multer()


// helpers
//
function getAttrs(body) {
  let attrs = Object.assign({}, body)
  attrs.name = titleize(body.name)
  attrs.slug = slugify(body.name)
  attrs.isActive = !!body.isActive
  return attrs
}

// actions
//
router.get('/', async (req, res, next) => {
  Survey.run().then(surveys => {
    res.render('surveys', { title: `${appName} – Surveys`, surveys: surveys })
  }).error(error => {
    res.status(500).render('error', { message: error, error: {} })
  })
})

router.post('/', (req, res, next) => {
  Survey.filter({ name: '' }).then(result => {
    if (result.length === 0) {
      const survey = new Survey({})
      survey.save().then(result => {
        res.json(result)
      }).error(handleThinkyError(res))
    } else {
      res.json(result[0])
    }
  }).error(handleThinkyError(res))
})

router.put('/:id', upload.array(), (req, res, next) => {
  Survey.get(req.params.id).update(getAttrs(req.body)).run().then(result => {
    res.json(result)
  }).error(handleThinkyError(res))
})

router.delete('/:id', (req, res, next) => {
  Survey.get(req.params.id).run().then(survey => {
    survey.delete().then(result => {
      res.json({ message: 'ok' })
    }).error(handleThinkyError(res))
  }).error(handleThinkyError(res))
})


export default router
