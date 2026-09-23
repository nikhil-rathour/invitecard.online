import dotenv from 'dotenv'

dotenv.config()

function required(name, fallback) {
  const value = process.env[name] ?? fallback
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: (process.env.NODE_ENV || 'development') === 'production',
  port: Number(process.env.PORT) || 5000,
  mongoUri: required('MONGODB_URI', 'mongodb://localhost:27017/invitecard.online'),
  clientUrl: required('CLIENT_URL', 'http://localhost:5173'),
  devOwnerId: process.env.DEV_OWNER_ID || '000000000000000000000001',
  jwtSecret: process.env.JWT_SECRET || 'dev_admin_secret_jwt_key_987654',
}
