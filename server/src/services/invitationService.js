import { Invitation } from '../models/Invitation.js'
import { Event } from '../models/Event.js'
import { Template } from '../models/Template.js'
import { ApiError } from '../utils/ApiError.js'
import { uniqueSlug } from '../utils/slugify.js'

function assertOwner(invitation, userId) {
  if (String(invitation.ownerId) !== String(userId)) {
    throw new ApiError(403, 'You cannot access this invitation')
  }
}

export async function createInvitation(ownerId, payload) {
  const template = await Template.findById(payload.templateId)
  if (!template || template.status !== 'published') {
    throw new ApiError(404, 'Template not found')
  }

  const invitation = await Invitation.create({
    ownerId,
    templateId: template._id,
    title: payload.title,
    slug: uniqueSlug(payload.title),
    status: payload.status || 'draft',
    language: payload.language || 'English',
    basicInfo: payload.basicInfo || {},
    hosts: payload.hosts || {},
    story: payload.story || {},
    theme: payload.theme || template.themeConfig || {},
  })

  if (payload.events?.length) {
    await Event.insertMany(
      payload.events.map((event, index) => ({
        ...event,
        invitationId: invitation._id,
        sortOrder: event.sortOrder ?? index,
      }))
    )
  }

  return getInvitationById(invitation._id, ownerId)
}

export async function listInvitations(ownerId, { status } = {}) {
  const filter = { ownerId }
  if (status) filter.status = status
  return Invitation.find(filter)
    .populate('templateId', 'name slug category previewImages')
    .sort({ updatedAt: -1 })
    .lean()
}

export async function getInvitationById(id, ownerId) {
  const invitation = await Invitation.findById(id)
    .populate('templateId', 'name slug category previewImages themeConfig')
    .lean()
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  assertOwner(invitation, ownerId)
  const events = await Event.find({ invitationId: invitation._id }).sort({ sortOrder: 1 }).lean()
  return { ...invitation, events }
}

export async function updateInvitation(id, ownerId, payload) {
  const invitation = await Invitation.findById(id)
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  assertOwner(invitation, ownerId)

  const { events, ...rest } = payload
  Object.assign(invitation, rest)
  await invitation.save()

  if (events) {
    await Event.deleteMany({ invitationId: invitation._id })
    if (events.length) {
      await Event.insertMany(
        events.map((event, index) => ({
          ...event,
          invitationId: invitation._id,
          sortOrder: event.sortOrder ?? index,
        }))
      )
    }
  }

  return getInvitationById(invitation._id, ownerId)
}

export async function deleteInvitation(id, ownerId) {
  const invitation = await Invitation.findById(id)
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  assertOwner(invitation, ownerId)
  await Event.deleteMany({ invitationId: invitation._id })
  await invitation.deleteOne()
}

export async function addEvent(invitationId, ownerId, payload) {
  const invitation = await Invitation.findById(invitationId)
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  assertOwner(invitation, ownerId)
  const count = await Event.countDocuments({ invitationId })
  return Event.create({
    ...payload,
    invitationId,
    sortOrder: payload.sortOrder ?? count,
  })
}

export async function updateEvent(eventId, ownerId, payload) {
  const event = await Event.findById(eventId)
  if (!event) throw new ApiError(404, 'Event not found')
  const invitation = await Invitation.findById(event.invitationId)
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  assertOwner(invitation, ownerId)
  Object.assign(event, payload)
  await event.save()
  return event
}

export async function deleteEvent(eventId, ownerId) {
  const event = await Event.findById(eventId)
  if (!event) throw new ApiError(404, 'Event not found')
  const invitation = await Invitation.findById(event.invitationId)
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  assertOwner(invitation, ownerId)
  await event.deleteOne()
}
