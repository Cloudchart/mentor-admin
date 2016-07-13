import multer from 'multer'
import { Router } from 'express'

import { _handleThinkyError } from './helpers'
import { appName } from '../lib'
import { Course, Card, Card_Course } from '../models'

const router = Router()
const upload = multer()


router.get('/courses/:courseId/cards', async (req, res, next) => {
  try {
    const items = await Card_Course.filter({ courseId: req.params.courseId }).getJoin({ card: true })
    res.json(items)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.post('/courses/:courseId/cards', async (req, res, next) => {
  try {
    const course = await Course.get(req.params.courseId)
    const card = new Card({})
    const cardCourse = new Card_Course({ courseId: course.id })
    cardCourse.card = card

    const result = await cardCourse.saveAll({ card: true })
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/course_cards/:id', upload.array(), async (req, res, next) => {
  try {
    const body = Object.assign({}, req.body)
    const cardCourse = await Card_Course.get(req.params.id).getJoin({ card: true })
    cardCourse.merge(body)

    const result = await cardCourse.saveAll({ card: true })
    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.delete('/course_cards/:id', async (req, res, next) => {
  try {
    const cardCourse = await Card_Course.get(req.params.id).getJoin({ card: true })
    const result = await cardCourse.deleteAll({ card: true })
    res.json({ message: 'ok' })
  } catch (err) {
    _handleThinkyError(err, res)
  }
})


export default router
