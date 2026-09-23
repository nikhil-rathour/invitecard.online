import { Router } from 'express'
import { adminLogin, registerAdmin } from '../controllers/authController.js'

export const authRouter = Router()

authRouter.post('/register', registerAdmin)
authRouter.post('/login', adminLogin)
