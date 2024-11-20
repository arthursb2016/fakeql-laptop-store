import { Router } from 'express'
import { registerUser } from '../controllers/auth'

const router = Router()

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const { status, message, user } = await registerUser(name, email, password)
    res.status(status).json({ message, data: { user }})
  } catch(error: any) {
    res.status(403).json({ message: 'Error registering user', error: error.message })
  }
})

router.post('/login', async (req, res) => {
  res.send('login endpoint')
})

router.post('/reset-password', async (req, res) => {
  res.send('reset password endpoint')
})

export default router
