import express from 'express'
import { addFriendHandler, deleteFriendHandler, getFriendListHandler } from '../controller/friend.controller.js'
import { authorize } from '../middleware/auth.middleware.js'
import { validateUserId } from '../middleware/validate.middleware.js'

const router = express.Router()

router.use(authorize)
router.get("/friends", getFriendListHandler)
router.post("/friends", validateUserId, addFriendHandler)
router.delete("/friends", validateUserId, deleteFriendHandler)

export default router