import express from 'express'
import { addRequestHandler, deleteRequestHandler, getRequestHandler, declineRequestHandler } from '../controller/friendRequest.controller.js'
import { authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(authorize)
router.post("/friend-request/:userId", addRequestHandler)
router.delete("/friend-request/delete/:userId", deleteRequestHandler)
router.get("/friend-request", getRequestHandler)
router.delete("/friend-request/decline/:userId", declineRequestHandler)

export default router