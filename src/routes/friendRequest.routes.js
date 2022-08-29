import express from 'express'
import { addRequestHandler, deleteRequestHandler, getRequestHandler, declineRequestHandler } from '../controller/friendRequest.controller.js'
import { authorize } from '../middleware/auth.middleware.js'
import { validateUserId } from '../middleware/validate.middleware.js'

const router = express.Router()

router.use(authorize)
router.get("/friend-request", getRequestHandler)
router.post("/friend-request", validateUserId, addRequestHandler)
router.delete("/friend-request/delete", validateUserId, deleteRequestHandler)
router.delete("/friend-request/decline", validateUserId, declineRequestHandler)

export default router