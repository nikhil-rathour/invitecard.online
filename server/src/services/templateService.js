import mongoose from 'mongoose'
import { Template, TEMPLATE_CATEGORIES } from '../models/Template.js'
import { ApiError } from '../utils/ApiError.js'

const SORT_MAP = {
  newest: { createdAt: -1 },
  'price-asc': { 'price.base': 1 },
  'price-desc': { 'price.base': -1 },
  name: { name: 1 },
}

export async function listTemplates({ category, language, search, sort = 'newest', page = 1, limit = 12 }) {
  const filter = { status: 'published' }
  if (category) filter.category = category
  if (language) filter.supportedLanguages = language
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ]
  }

  const skip = (page - 1) * limit
  const [items, total] = await Promise.all([
    Template.find(filter).sort(SORT_MAP[sort] || SORT_MAP.newest).skip(skip).limit(limit).lean(),
    Template.countDocuments(filter),
  ])

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  }
}

export async function getTemplateBySlug(slug) {
  const query = mongoose.Types.ObjectId.isValid(slug)
    ? { $or: [{ slug }, { _id: slug }] }
    : { slug }

  const template = await Template.findOne({ ...query, status: 'published' }).lean()
  if (!template) throw new ApiError(404, 'Template not found')
  return template
}

export async function listRelatedTemplates(template, limit = 4) {
  return Template.find({
    status: 'published',
    category: template.category,
    _id: { $ne: template._id },
  })
    .limit(limit)
    .lean()
}

export function listCategories() {
  return TEMPLATE_CATEGORIES.map((slug) => ({
    slug,
    label: slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' '),
  }))
}
