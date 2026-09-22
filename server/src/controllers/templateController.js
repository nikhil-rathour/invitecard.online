import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/apiResponse.js'
import * as templateService from '../services/templateService.js'

export const listTemplates = asyncHandler(async (req, res) => {
  const query = req.validatedQuery || {}
  const { items, meta } = await templateService.listTemplates(query)
  return sendSuccess(res, { message: 'Templates fetched', data: items, meta })
})

export const getTemplate = asyncHandler(async (req, res) => {
  const template = await templateService.getTemplateBySlug(req.params.slug)
  const related = await templateService.listRelatedTemplates(template)
  return sendSuccess(res, { message: 'Template fetched', data: { ...template, related } })
})

export const listCategories = asyncHandler(async (_req, res) => {
  return sendSuccess(res, { message: 'Categories fetched', data: templateService.listCategories() })
})
