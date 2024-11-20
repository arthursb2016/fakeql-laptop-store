import { User } from '../src/models/user'
import { registerUser } from '../src/controllers/auth'

jest.mock('../src/models/user', () => ({
  User: {
    create: jest.fn(),
    findOne: jest.fn()
  }
}))

describe('User registration', () => {
  const data = { name: 'John', email: 'john@gmail.com', password: '123456' }
  const mockId = '123'

  beforeEach(() => {
    (User.create as jest.Mock).mockImplementation((params: any) => {
      return { ...params, _id: mockId }
    })
  
    (User.findOne as jest.Mock).mockImplementation((params: any) => {
      if (params.email === data.email) return data
      return undefined
    })
  })

  it('should fail on existing user', async () => {
    const { status, message, user } = await registerUser(data.name, data.email, data.password)
    expect(status).toBe(400)
    expect(user).toBe(undefined)
  })

  it('should succeed on new user', async () => {
    const newEmail = data.email.replace('john', 'john+2')
    const { status, message, user } = await registerUser(data.name, newEmail, data.password)
    expect(status).toBe(201)
    expect(user?.email).toBe(newEmail)
    expect(user?._id).toBe(mockId)
  })
})
