import { User } from '../models/user'
import jwt from 'jsonwebtoken'

export async function registerUser(name: string, email: string, password: string) {
  let user = await User.findOne({ email })
  if (user) {
    return { status: 400, message: 'Email already exists', user: undefined }
  }
  user = await User.create({ name, email, password })
  return {
    status: 201,
    message: 'User successfully created',
    user
  }
}

export async function authenticateUser(email: string, password: string) {
  const user = await User.findOne({ email, password })
  if (!user) {
    return { status: 400, message: 'Invalid credentials' }
  }
  const token = jwt.sign({ user: user }, process.env.JWT_SECRET!, { expiresIn: '7 days' })
  return {
    status: 200,
    message: 'Login successful',
    token
  }
}