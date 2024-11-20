import { User } from '../models/user'

export async function registerUser(name: string, email: string, password: string) {
  let user = await User.findOne({ email })
  if (user) {
    return { status: 400, message: 'Email already exists', user: undefined }
  }
  user = await User.create({ name, email, password })
  console.log('controller', user)
  return {
    status: 201,
    message: 'User successfully created',
    user
  }
}