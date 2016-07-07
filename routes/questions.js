import multer from 'multer'
import { Router } from 'express'

import { handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Survey, Question } from '../models'

const router = Router()
const upload = multer()


router.get('/surveys/:surveyId/questions', (req, res, next) => {
  Question.filter({ surveyId: req.params.surveyId }).then(result => {
    res.json(result)
  }).error(handleThinkyError(res))
})

router.post('/surveys/:surveyId/questions', (req, res, next) => {
  Survey.get(req.params.surveyId).then(result => {
    const question = new Question({ surveyId: result.id })
    question.save().then(result => {
      res.json(result)
    }).error(handleThinkyError(res))
  }).error(handleThinkyError(res))
})

router.put('/questions/:id', upload.array(), (req, res, next) => {
  Question.get(req.params.id).update(Object.assign({}, req.body)).run().then(result => {
    res.json(result)
  }).error(handleThinkyError(res))
})

router.delete('/questions/:id', (req, res, next) => {
  Question.get(req.params.id).run().then(question => {
    question.delete().then(result => {
      res.json({ message: 'ok' })
    }).error(handleThinkyError(res))
  }).error(handleThinkyError(res))
})


export default router
