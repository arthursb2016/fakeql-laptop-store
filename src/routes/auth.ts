import { Router } from 'express'

const router = Router()

router.post('/register', async (req, res) => {
  res.send('register endpoint')
})

router.post('/login', async (req, res) => {
  res.send('login endpoint')
})

router.post('/reset-password', async (req, res) => {
  res.send('reset password endpoint')
})

export default router
