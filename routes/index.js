import { Router } from 'express'

const router = Router()


router.get('/', (req, res, next) => {
  res.render('dashboard', {
    title: 'Dashboard',
  })
})


export default router
