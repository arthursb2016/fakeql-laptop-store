import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServer } from '@apollo/server'
import { json } from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers'

import authRoutes from './routes/auth'
import { authMiddleware } from './middlewares/auth'

const startServer = async () => {
  const app = express()
  app.use(helmet())
  app.use(express.json())
  app.use('/auth', authRoutes)

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  await server.start()

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = authMiddleware(req)
        return { user }
      }
    })
  )

  try {
    await mongoose.connect(process.env.MONGO_URI || '')
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }

  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000')
  })
}

startServer()
