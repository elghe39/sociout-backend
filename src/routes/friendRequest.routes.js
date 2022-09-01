import express from 'express'
import { addRequestHandler, deleteRequestHandler, getRequestHandler, declineRequestHandler } from '../controller/friendRequest.controller.js'
import { authorize } from '../middleware/auth.middleware.js'
import { validateUserId } from '../middleware/validate.middleware.js'

const router = express.Router()

router.use(authorize)
router.get("/friend-requests", getRequestHandler)
router.post("/friend-requests", validateUserId, addRequestHandler)
router.delete("/friend-requests/delete", validateUserId, deleteRequestHandler)
router.delete("/friend-requests/decline", validateUserId, declineRequestHandler)

export default router