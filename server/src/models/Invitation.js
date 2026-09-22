import mongoose from 'mongoose'
import { SUPPORTED_LANGUAGES } from './Template.js'

export const INVITATION_STATUSES = ['draft', 'ready', 'published', 'archived']

const invitationSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: INVITATION_STATUSES, default: 'draft', index: true },
    language: { type: String, enum: SUPPORTED_LANGUAGES, default: 'English' },
    basicInfo: {
      primaryName: { type: String, default: '' },
      secondaryName: { type: String, default: '' },
      shortMessage: { type: String, default: '' },
    },
    hosts: {
      brideFamily: { type: String, default: '' },
      groomFamily: { type: String, default: '' },
      hostNames: { type: String, default: '' },
    },
    story: {
      coupleStory: { type: String, default: '' },
      familyMessage: { type: String, default: '' },
      message: { type: String, default: '' },
    },
    theme: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
)

invitationSchema.index({ ownerId: 1, createdAt: -1 })

export const Invitation = mongoose.model('Invitation', invitationSchema)
