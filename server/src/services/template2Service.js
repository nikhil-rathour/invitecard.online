import { Template2Invitation } from '../models/Template2Invitation.js'
import { ApiError } from '../utils/ApiError.js'
import { uniqueSlug } from '../utils/slugify.js'

function assertOwner(invitation, userId) {
  if (String(invitation.ownerId) !== String(userId)) {
    throw new ApiError(403, 'You cannot access this invitation')
  }
}

export async function createTemplate2(ownerId, payload) {
  const baseSlug = payload.slug || payload.title || `${payload.brideName || 'bride'}-weds-${payload.groomName || 'groom'}`
  const slug = uniqueSlug(baseSlug)

  const invitation = await Template2Invitation.create({
    ...payload,
    ownerId,
    slug,
  })

  return invitation
}

export async function listTemplate2(ownerId, { status } = {}) {
  const filter = { ownerId }
  if (status) filter.status = status
  return Template2Invitation.find(filter).sort({ updatedAt: -1 }).lean()
}

export async function getTemplate2ById(id, ownerId) {
  const invitation = await Template2Invitation.findById(id).lean()
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  if (ownerId) assertOwner(invitation, ownerId)
  return invitation
}

export async function getTemplate2BySlug(slug) {
  const invitation = await Template2Invitation.findOne({ slug }).lean()
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  return invitation
}

export async function updateTemplate2(id, ownerId, payload) {
  const invitation = await Template2Invitation.findById(id)
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  assertOwner(invitation, ownerId)

  // Don't overwrite ownerId or _id
  delete payload.ownerId
  delete payload._id

  Object.assign(invitation, payload)
  await invitation.save()

  return invitation
}

export async function deleteTemplate2(id, ownerId) {
  const invitation = await Template2Invitation.findById(id)
  if (!invitation) throw new ApiError(404, 'Invitation not found')
  assertOwner(invitation, ownerId)
  await invitation.deleteOne()
  return { message: 'Invitation deleted successfully' }
}

export async function addWish(slugOrId, wishPayload) {
  let query = { slug: slugOrId }
  if (slugOrId && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
    query = { $or: [{ _id: slugOrId }, { slug: slugOrId }] }
  }

  const invitation = await Template2Invitation.findOne(query)
  if (!invitation) throw new ApiError(404, 'Invitation not found')

  if (!wishPayload.name || !wishPayload.message) {
    throw new ApiError(400, 'Name and message are required to send a wish')
  }

  const newWish = {
    name: wishPayload.name.trim(),
    relation: wishPayload.relation?.trim() || 'Well Wisher',
    message: wishPayload.message.trim(),
    date: 'Just now',
  }

  invitation.initialWishes.unshift(newWish)
  await invitation.save()

  return invitation.initialWishes
}
