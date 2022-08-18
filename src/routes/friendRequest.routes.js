import express from 'express'
import { addRequestHandler, deleteRequestHandler, getRequestHandler, declineRequestHandler } from '../controller/friendRequest.controller.js'
import { authorize } from '../middleware/auth.middleware.js'
import { validateUserId } from '../middleware/validate.middleware.js'

const router = express.Router()

router.use(authorize)
router.get("/friend-request", getRequestHandler)
router.post("/friend-request/:userId", validateUserId, addRequestHandler)
router.delete("/friend-request/delete/:userId", validateUserId, deleteRequestHandler)
router.delete("/friend-request/decline/:userId", validateUserId, declineRequestHandler)

export default router