import { Router } from 'express'
import * as controller from '../controllers/invitationController.js'
import { validate } from '../middlewares/validate.js'
import { eventInputSchema } from '../validators/invitationValidators.js'
import {
  createInvitationSchema,
  updateInvitationSchema,
  invitationIdParamSchema,
  eventIdParamSchema,
  listInvitationsQuerySchema,
} from '../validators/invitationValidators.js'
import { attachDevUser } from '../middlewares/devUser.js'

export const invitationRouter = Router()

invitationRouter.use(attachDevUser)

invitationRouter.get('/', validate(listInvitationsQuerySchema, 'query'), controller.listInvitations)
invitationRouter.post('/', validate(createInvitationSchema), controller.createInvitation)
invitationRouter.get('/:id', validate(invitationIdParamSchema, 'params'), controller.getInvitation)
invitationRouter.patch('/:id', validate(invitationIdParamSchema, 'params'), validate(updateInvitationSchema), controller.updateInvitation)
invitationRouter.delete('/:id', validate(invitationIdParamSchema, 'params'), controller.removeInvitation)
invitationRouter.post(
  '/:id/events',
  validate(invitationIdParamSchema, 'params'),
  validate(eventInputSchema),
  controller.addEvent
)

export const eventRouter = Router()
eventRouter.use(attachDevUser)
eventRouter.patch(
  '/:eventId',
  validate(eventIdParamSchema, 'params'),
  validate(eventInputSchema.partial()),
  controller.updateEvent
)
eventRouter.delete('/:eventId', validate(eventIdParamSchema, 'params'), controller.removeEvent)
