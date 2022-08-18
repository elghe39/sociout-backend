import express from 'express'
import { loginHandler, deleteCookieHandler } from '../controller/auth.controller.js'
import { authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/login', loginHandler)
router.post('/logout', authorize, deleteCookieHandler)

export default router