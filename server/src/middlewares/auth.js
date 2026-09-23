import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

export function verifyAdminToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication token required'))
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, env.jwtSecret)
    req.user = decoded
    req.userId = decoded.ownerId
    next()
  } catch (err) {
    next(new ApiError(401, 'Invalid or expired authentication token'))
  }
}
