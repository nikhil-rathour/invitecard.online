import { z } from 'zod'
import { SUPPORTED_LANGUAGES, TEMPLATE_CATEGORIES } from '../models/Template.js'

export const listTemplatesQuerySchema = z.object({
  category: z.enum(TEMPLATE_CATEGORIES).optional(),
  language: z.enum(SUPPORTED_LANGUAGES).optional(),
  search: z.string().trim().max(80).optional(),
  sort: z.enum(['newest', 'price-asc', 'price-desc', 'name']).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(48).optional(),
})

export const slugParamSchema = z.object({
  slug: z.string().min(1),
})
