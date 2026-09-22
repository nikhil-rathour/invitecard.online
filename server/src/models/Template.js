import mongoose from 'mongoose'

export const TEMPLATE_CATEGORIES = [
  'wedding',
  'engagement',
  'birthday',
  'baby-shower',
  'housewarming',
  'pooja',
  'anniversary',
  'other',
]

export const SUPPORTED_LANGUAGES = ['English', 'Hindi', 'Gujarati']
export const TEMPLATE_STATUSES = ['draft', 'published', 'archived']

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, enum: TEMPLATE_CATEGORIES, index: true },
    description: { type: String, required: true, trim: true },
    supportedLanguages: {
      type: [String],
      enum: SUPPORTED_LANGUAGES,
      default: ['English'],
    },
    previewImages: { type: [String], default: [] },
    demoUrl: { type: String, default: '' },
    price: {
      base: { type: Number, required: true, min: 0 },
      currency: { type: String, default: 'INR' },
    },
    features: { type: [String], default: [] },
    themeConfig: { type: mongoose.Schema.Types.Mixed, default: {} },
    demoData: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: { type: String, enum: TEMPLATE_STATUSES, default: 'published', index: true },
  },
  { timestamps: true }
)

templateSchema.index({ name: 'text', description: 'text' })
templateSchema.index({ category: 1, status: 1 })

export const Template = mongoose.model('Template', templateSchema)
