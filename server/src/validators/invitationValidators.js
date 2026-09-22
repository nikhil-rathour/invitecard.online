import { z } from 'zod'
import { SUPPORTED_LANGUAGES } from '../models/Template.js'
import { INVITATION_STATUSES } from '../models/Invitation.js'

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id')

export const eventInputSchema = z.object({
  title: z.string().trim().min(1, 'Event name is required').max(80),
  date: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  venueName: z.string().trim().max(120).optional(),
  address: z.string().trim().max(240).optional(),
  mapsUrl: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\//i.test(value), 'Enter a valid URL'),
  description: z.string().trim().max(500).optional(),
  sortOrder: z.number().int().min(0).optional(),
})

export const createInvitationSchema = z.object({
  templateId: objectId,
  title: z.string().trim().min(2).max(120),
  language: z.enum(SUPPORTED_LANGUAGES).optional(),
  status: z.enum(['draft', 'ready']).optional(),
  basicInfo: z
    .object({
      primaryName: z.string().trim().max(120).optional(),
      secondaryName: z.string().trim().max(160).optional(),
      shortMessage: z.string().trim().max(400).optional(),
    })
    .optional(),
  hosts: z
    .object({
      brideFamily: z.string().trim().max(160).optional(),
      groomFamily: z.string().trim().max(160).optional(),
      hostNames: z.string().trim().max(240).optional(),
    })
    .optional(),
  story: z
    .object({
      coupleStory: z.string().trim().max(2000).optional(),
      familyMessage: z.string().trim().max(2000).optional(),
      message: z.string().trim().max(2000).optional(),
    })
    .optional(),
  theme: z.record(z.string(), z.unknown()).optional(),
  events: z.array(eventInputSchema).max(12).optional(),
})

export const updateInvitationSchema = createInvitationSchema.partial().omit({ templateId: true })

export const invitationIdParamSchema = z.object({
  id: objectId,
})

export const eventIdParamSchema = z.object({
  eventId: objectId,
})

export const listInvitationsQuerySchema = z.object({
  status: z.enum(INVITATION_STATUSES).optional(),
})
