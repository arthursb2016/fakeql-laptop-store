import { Router } from 'express'
import { registerUser, authenticateUser } from '../controllers/auth'

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
  const { email, password } = req.body
  try {
    const { status, message, token } = await authenticateUser(email, password)
    res.status(status).json({ message, data: { token }})
  } catch(error: any) {
    res.status(403).json({ message: 'Invalid credentials', error: error.message })
  }
})

export default router
