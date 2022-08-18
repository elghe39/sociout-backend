import express from 'express'
import { addFriendHandler, deleteFriendHandler, getFriendListHandler } from '../controller/friend.controller.js'
import { authorize } from '../middleware/auth.middleware.js'
import { validateUserId } from '../middleware/validate.middleware.js'

const router = express.Router()

router.use(authorize)
router.get("/friend", getFriendListHandler)
router.post("/friend/:userId", validateUserId, addFriendHandler)
router.delete("/friend/:userId", validateUserId, deleteFriendHandler)

export default router