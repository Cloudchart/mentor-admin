import multer from 'multer'
import { Router } from 'express'

import { _handleThinkyError, getFilteredAttrs } from './helpers'
import { Course, Card } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['author', 'content', 'origin', 'tags']


// helpers
//
function getCardsForImport(course, data) {
  return new Promise((resolve, reject) => {
    let result = []
    const requests = data.hits.reduce((promiseChain, item) => {
      return promiseChain.then(async () => {
        try {
          const cards = await Card.filter({ content: item.content })
          let card

          if (cards.length > 0) {
            card = cards[0]
          } else {
            card = new Card({
              content: item.content,
              author: item.user ? item.user.name : '',
              origin: item.origin,
              tags: [data.query],
            })
            await card.save()
          }

          const insight = course.insights.find(insight => insight.id === card.id)
          if (!insight) result.push(card)
        } catch (err) {
          console.log('Error:', err)
        }
      })
    }, Promise.resolve())

    requests.then(() => resolve(result))
  })
}

// actions
//
router.get('/courses/:courseId/cards', async (req, res, next) => {
  try {
    const course = await Course.get(req.params.courseId)
    const items = await Card.getAll(...course.insights.map(item => item.id))
    res.json(items)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.post('/courses/:courseId/cards', async (req, res, next) => {
  try {
    const course = await Course.get(req.params.courseId)
    const card = new Card({})
    const result = await card.save()

    course.insights = course.insights.concat({ id: result.id })
    course.save()

    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.post('/courses/:courseId/cards/import', async (req, res, next) => {
  try {
    const course = await Course.get(req.params.courseId)
    const cards = await getCardsForImport(course, req.body)

    course.insights = course.insights.concat(cards.map(card => { return { id: card.id } }))
    await course.save()

    res.json(cards)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})

router.put('/course_cards/:id', upload.array(), async (req, res, next) => {
  try {
    const card = await Card.get(req.params.id)
    const attrs = getFilteredAttrs(req.body, permittedAttrs)
    const result = await card.merge(attrs).save()

    res.json(result)
  } catch (err) {
    _handleThinkyError(err, res)
  }
})


export default router
