import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/apiResponse.js'
import * as template2Service from '../services/template2Service.js'

export const createTemplate2 = asyncHandler(async (req, res) => {
  const invitation = await template2Service.createTemplate2(req.user.id || req.user.ownerId, req.body)
  return sendSuccess(res, { status: 201, message: 'Jaipur Shahi Vivah invitation created', data: invitation })
})

export const listTemplate2 = asyncHandler(async (req, res) => {
  const invitations = await template2Service.listTemplate2(req.user.id || req.user.ownerId, req.query)
  return sendSuccess(res, { message: 'Invitations fetched', data: invitations })
})

export const getTemplate2 = asyncHandler(async (req, res) => {
  const invitation = await template2Service.getTemplate2ById(req.params.id, req.user?.id || req.user?.ownerId)
  return sendSuccess(res, { message: 'Invitation fetched', data: invitation })
})

export const getPublicTemplate2 = asyncHandler(async (req, res) => {
  const invitation = await template2Service.getTemplate2BySlug(req.params.slug)
  return sendSuccess(res, { message: 'Invitation fetched', data: invitation })
})

export const updateTemplate2 = asyncHandler(async (req, res) => {
  const invitation = await template2Service.updateTemplate2(req.params.id, req.user.id || req.user.ownerId, req.body)
  return sendSuccess(res, { message: 'Invitation updated', data: invitation })
})

export const removeTemplate2 = asyncHandler(async (req, res) => {
  await template2Service.deleteTemplate2(req.params.id, req.user.id || req.user.ownerId)
  return sendSuccess(res, { message: 'Invitation deleted' })
})

export const addPublicWish = asyncHandler(async (req, res) => {
  const wishes = await template2Service.addWish(req.params.slugOrId, req.body)
  return sendSuccess(res, { status: 201, message: 'Blessing published successfully', data: wishes })
})
