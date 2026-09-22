import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDb() {
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 4000 })
    console.log('Connected to MongoDB')
    return mongoose.connection
  } catch (error) {
    if (env.isProd) throw error
    const { MongoMemoryServer } = await import('mongodb-memory-server')
    const memory = await MongoMemoryServer.create()
    await mongoose.connect(memory.getUri())
    console.warn('Local MongoDB is unavailable. Using in-memory MongoDB for this process only.')
    return mongoose.connection
  }
}
