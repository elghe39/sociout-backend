import express from 'express'
import { validation } from '../middleware/validate.middleware.js'
import { loginSchema } from '../schema/auth.schema.js'
import { loginHandler, deleteCookieHandler } from '../controller/auth.controller.js'
import { authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/login', validation(loginSchema), loginHandler)
router.post('/logout', authorize, deleteCookieHandler)

export default router