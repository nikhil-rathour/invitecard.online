import { Router } from 'express'
import * as controller from '../controllers/template2Controller.js'
import { verifyAdminToken } from '../middlewares/auth.js'

export const template2Router = Router()

// Public endpoint to load invitation by slug
template2Router.get('/public/:slug', controller.getPublicTemplate2)

// Public endpoint for guests to submit warm wishes & blessings
template2Router.post('/public/:slugOrId/wishes', controller.addPublicWish)

// Protected Admin endpoints
template2Router.get('/', verifyAdminToken, controller.listTemplate2)
template2Router.post('/', verifyAdminToken, controller.createTemplate2)
template2Router.get('/:id', verifyAdminToken, controller.getTemplate2)
template2Router.patch('/:id', verifyAdminToken, controller.updateTemplate2)
template2Router.delete('/:id', verifyAdminToken, controller.removeTemplate2)
