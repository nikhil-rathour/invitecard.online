import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

export function errorHandler(err, req, res, _next) {
  const status = err.statusCode || 500
  const isOperational = err instanceof ApiError

  if (!env.isProd && (!err.statusCode || err.statusCode >= 500)) {
    console.error(err)
  }

  res.status(status).json({
    success: false,
    message: isOperational || !env.isProd ? err.message : 'Something went wrong',
    ...(err.details && { details: err.details }),
  })
}

export function notFound(_req, _res, next) {
  next(new ApiError(404, 'Route not found'))
}
