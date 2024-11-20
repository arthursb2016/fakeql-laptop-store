import { Request } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) throw new Error('Unauthorized')
  const user = jwt.verify(token, 'your-secret-key')
  return user
}
