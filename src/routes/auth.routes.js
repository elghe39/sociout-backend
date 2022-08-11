import express from 'express'
import { validation } from '../middleware/validate.middleware.js'
import { loginSchema } from '../schema/auth.schema.js'
import { loginHandler } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/login', validation(loginSchema), loginHandler)

export default router