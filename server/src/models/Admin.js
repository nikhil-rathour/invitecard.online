import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Admin',
      trim: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  { timestamps: true }
)

export const Admin = mongoose.model('Admin', adminSchema)
