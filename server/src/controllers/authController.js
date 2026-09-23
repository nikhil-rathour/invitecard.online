import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'
import { sendSuccess } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { hashPassword, verifyPassword } from '../utils/password.js'
import { Admin } from '../models/Admin.js'

export const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body || {}

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required')
  }

  const cleanEmail = String(email).trim().toLowerCase()
  const cleanPass = String(password).trim()

  if (cleanPass.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long')
  }

  const existingAdmin = await Admin.findOne({ email: cleanEmail })
  if (existingAdmin) {
    throw new ApiError(409, 'Admin user already exists with this email')
  }

  const hashedPassword = await hashPassword(cleanPass)

  const admin = await Admin.create({
    email: cleanEmail,
    password: hashedPassword,
    name: name ? String(name).trim() : 'Admin',
    role: 'admin',
  })

  const token = jwt.sign(
    {
      ownerId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    },
    env.jwtSecret,
    { expiresIn: '7d' }
  )

  return sendSuccess(res, {
    status: 201,
    message: 'Admin registered successfully',
    data: {
      token,
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    },
  })
})

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required')
  }

  const cleanEmail = String(email).trim().toLowerCase()
  const cleanPass = String(password).trim()

  // Authenticate against MongoDB Admin collection
  const admin = await Admin.findOne({ email: cleanEmail })

  if (!admin) {
    throw new ApiError(401, 'Invalid admin credentials')
  }

  const isValid = await verifyPassword(cleanPass, admin.password)
  if (!isValid) {
    throw new ApiError(401, 'Invalid admin credentials')
  }

  const token = jwt.sign(
    {
      ownerId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    },
    env.jwtSecret,
    { expiresIn: '7d' }
  )

  return sendSuccess(res, {
    message: 'Admin logged in successfully',
    data: {
      token,
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    },
  })
})
