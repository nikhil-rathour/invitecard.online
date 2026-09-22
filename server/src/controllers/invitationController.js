import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/apiResponse.js'
import * as invitationService from '../services/invitationService.js'

export const createInvitation = asyncHandler(async (req, res) => {
  const invitation = await invitationService.createInvitation(req.user.id, req.body)
  return sendSuccess(res, { status: 201, message: 'Draft saved', data: invitation })
})

export const listInvitations = asyncHandler(async (req, res) => {
  const invitations = await invitationService.listInvitations(req.user.id, req.validatedQuery || {})
  return sendSuccess(res, { message: 'Invitations fetched', data: invitations })
})

export const getInvitation = asyncHandler(async (req, res) => {
  const invitation = await invitationService.getInvitationById(req.params.id, req.user.id)
  return sendSuccess(res, { message: 'Invitation fetched', data: invitation })
})

export const updateInvitation = asyncHandler(async (req, res) => {
  const invitation = await invitationService.updateInvitation(req.params.id, req.user.id, req.body)
  return sendSuccess(res, { message: 'Invitation updated', data: invitation })
})

export const removeInvitation = asyncHandler(async (req, res) => {
  await invitationService.deleteInvitation(req.params.id, req.user.id)
  return sendSuccess(res, { message: 'Invitation deleted' })
})

export const addEvent = asyncHandler(async (req, res) => {
  const event = await invitationService.addEvent(req.params.id, req.user.id, req.body)
  return sendSuccess(res, { status: 201, message: 'Event added', data: event })
})

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await invitationService.updateEvent(req.params.eventId, req.user.id, req.body)
  return sendSuccess(res, { message: 'Event updated', data: event })
})

export const removeEvent = asyncHandler(async (req, res) => {
  await invitationService.deleteEvent(req.params.eventId, req.user.id)
  return sendSuccess(res, { message: 'Event deleted' })
})
