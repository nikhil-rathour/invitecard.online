import { Router } from 'express'
import * as controller from '../controllers/templateController.js'
import { validate } from '../middlewares/validate.js'
import { listTemplatesQuerySchema, slugParamSchema } from '../validators/templateValidators.js'

export const templateRouter = Router()

templateRouter.get('/', validate(listTemplatesQuerySchema, 'query'), controller.listTemplates)
templateRouter.get('/:slug', validate(slugParamSchema, 'params'), controller.getTemplate)
        