import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { env } from './config/env.js'
import { sanitizeRequest } from './utils/sanitize.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import { healthRouter } from './routes/health.routes.js'
import { invitationRouter, eventRouter } from './routes/invitation.routes.js'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(
    cors({
      origin: env.clientUrl,
      credentials: true,
    })
  )
  app.use(express.json({ limit: '100kb' }))
  app.use(express.urlencoded({ extended: false, limit: '100kb' }))
  app.use(sanitizeRequest)
  app.use(
    morgan(env.isProd ? 'combined' : 'dev', {
      skip: (req) => req.path === '/api/v1/health',
    })
  )
  app.use(
    '/api/v1',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: true,
      legacyHeaders: false,
    })
  )

  app.use('/api/v1/health', healthRouter)
  app.use('/api/v1/invitations', invitationRouter)
  app.use('/api/v1/events', eventRouter)

  app.use(notFound)
  app.use(errorHandler)
  return app
}
