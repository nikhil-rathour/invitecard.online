import dns from 'node:dns'
import mongoose from 'mongoose'
import { env } from './env.js'

// Fallback to Google / Cloudflare public DNS if local Windows DNS blocks SRV queries
try {
  dns.setServers(['8.8.8.8', '1.1.1.1'])
} catch {
  // Ignore if DNS server configuration is locked by environment
}

export async function connectDb() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection
  }
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 })
    console.log('Connected to MongoDB Atlas')
    return mongoose.connection
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error.message)
    throw error
  }
}
