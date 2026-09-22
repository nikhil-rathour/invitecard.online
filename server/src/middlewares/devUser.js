import mongoose from 'mongoose'
import { env } from '../config/env.js'

/**
 * Isolated development identity.
 * Replace with JWT auth middleware in Phase 3.
 */
export function attachDevUser(req, _res, next) {
  req.user = {
    id: new mongoose.Types.ObjectId(env.devOwnerId),
    role: 'customer',
    isDevUser: true,
  }
  next()
}
