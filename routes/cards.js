import multer from 'multer'
import { Router } from 'express'

import { _handleThinkyError, getFilteredAttrs } from './helpers'
import { Course, Card } from '../models'

const router = Router()
const upload = multer()
const permittedAttrs = ['author', 'content', 'origin', 'tags']


// helpers
//
// function findOrCreateTags(names) {
//   return new Promise((resolve, reject) => {
//     let result = []
//     if (!names) return resolve(result)

//     const requests = names.reduce((promiseChain, name) => {
//       return promiseChain.then(async () => {
//         const tags = await Tag.filter({ name: name })
//         if (tags.length > 0) {
//           result.push(tags[0])
//         } else {
//           result.push(new Tag({ name: name }))
//         }
//       })
//     }, Promise.resolve())

//     requests.then(() => resolve(result))
//   })
// }

// function importCards(course, data) {
//   return new Promise((resolve, reject) => {
//     const requests = data.hits.reduce((promiseChain, item) => {
//       return promiseChain.then(async () => {
//         try {
//           const cards = await Card.filter({ text: item.content })
//           let card

//           if (cards.length > 0) {
//             card = cards[0]
//           } else {
//             card = new Card({
//               text: item.content,
//               author: item.user ? item.user.name : '',
//               originUrl: item.origin ? item.origin.url : '',
//             })
//             card.tags = await findOrCreateTags([data.query])
//             await card.saveAll()
//           }

//           const cardCourses = await Card_Course.filter({ courseId: course.id, cardId: card.id })
//           if (cardCourses.length === 0) {
//             const cardCourse = new Card_Course({ course: course, card: card })
//             await cardCourse.saveAll()
//           }
//         } catch (err) {
//           console.log('!!!', err)
//         }
//       })
//     }, Promise.resolve())

//     requests.then(() => resolve())
//   })
// }

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
    const card = new Card({})
    const result = await card.save()

    const course = await Course.get(req.params.courseId)
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
    // await importCards(course, req.body)
    res.json({ message: 'ok' })
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
