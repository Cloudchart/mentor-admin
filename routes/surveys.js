import rethinkdbdash from 'rethinkdbdash'
import multer from 'multer'
import { Router } from 'express'

import dbconfig from '../config/database'
import { appName } from '../lib'
import { getFilteredAttrs } from './helpers'

const permittedAttrs = ['name', 'isActive']
const router = Router()
const r = rethinkdbdash(dbconfig[process.env.NODE_ENV])
const upload = multer()


router.get('/', async (req, res, next) => {
  r.table('surveys').run().then(surveys => {
    res.render('surveys', { title: `${appName} – Surveys`, surveys: surveys })
  }).error(error => {
    res.status(500).render('error', { message: error, error: {} })
  })
})

router.post('/', upload.array(), (req, res, next) => {
  const attrs = getFilteredAttrs(req.body, permittedAttrs)
  console.log('@@@', req.body, attrs);
  res.json('ok')

  // r.table('surveys').insert([
  //   {
  //     name: 'Awesome',
  //     slug: 'awesome',
  //     isActive: true,
  //     questions: [
  //       {
  //         name: 'We think there is a shift from less about the actual things to being about the – ',
  //         explanation: 'Dolphin savant geod :)',
  //         answers: [
  //           { name: 'Dolphin savant geod', isCorrect: true },
  //           { name: 'asd', isCorrect: false },
  //           { name: 'qwe', isCorrect: false },
  //         ]
  //       },
  //       {
  //         name: 'Rifle numinous Tokyo market augmented reality towards San Francisco. Corrupted boy skyscraper corporation drugs saturation point Tokyo voodoo?',
  //         answers: [
  //           { name: '123', isCorrect: true },
  //           { name: 'cxz', isCorrect: false },
  //           { name: 'wer', isCorrect: false },
  //         ]
  //       }
  //     ]
  //   }
  // ]).run()

  // const attrs = getFilteredAttrs(req.body, permittedAttrs)
  // Survey.create(attrs).then(survey => {
  //   res.json(survey)
  // }).catch(error => {
  //   res.status(500).json({ error })
  // })
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

// router.delete('/:id', (req, res, next) => {
//   Survey.findById(req.params.id).then(survey => {
//     survey.destroy()
//     res.json({ message: 'ok' })
//   }).catch(error => {
//     res.status(404).json({ message: 'not found' })
//   })
// })


export default router
