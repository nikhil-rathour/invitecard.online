import mongoose from 'mongoose'

export const SUPPORTED_LANGUAGES = ['English', 'Hindi', 'Gujarati']
export const INVITATION_STATUSES = ['draft', 'ready', 'published', 'archived']

// All themed invitation slugs — must match AppRoutes
export const TEMPLATE_IDS = [
  'jaipur-shahi-vivah',
  'royal-garden-wedding',
  'udaipur-lake-palace',
  'mughal-opulence',
  'floral-mandap',
  'pink-city-celebration',
]

const invitationSchema = new mongoose.Schema(
  {
    ownerId:    { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    title:      { type: String, required: true, trim: true },
    slug:       { type: String, required: true, unique: true, lowercase: true, trim: true },
    status:     { type: String, enum: INVITATION_STATUSES, default: 'draft', index: true },
    language:   { type: String, enum: SUPPORTED_LANGUAGES, default: 'English' },

    // Which template/design this invitation uses
    templateId: { type: String, enum: TEMPLATE_IDS, required: true },

    // Couple / primary info
    basicInfo: {
      primaryName:   { type: String, default: '' },
      secondaryName: { type: String, default: '' },
      shortMessage:  { type: String, default: '' },
    },

    // Hosting families
    hosts: {
      brideFamily: { type: String, default: '' },
      groomFamily: { type: String, default: '' },
      hostNames:   { type: String, default: '' },
    },

    // Story / message
    story: {
      coupleStory:   { type: String, default: '' },
      familyMessage: { type: String, default: '' },
      message:       { type: String, default: '' },
    },

    // Free-form theme overrides (colors, fonts, etc.)
    theme: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
)

invitationSchema.index({ ownerId: 1, createdAt: -1 })

export const Invitation = mongoose.model('Invitation', invitationSchema)
