import { Request } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return undefined
  const user = jwt.verify(token, process.env.JWT_SECRET!)
  return user
}
