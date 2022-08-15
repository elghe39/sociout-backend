import express from 'express'
import { addFriendHandler, deleteFriendHandler } from '../controller/friend.controller.js'
import { authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(authorize)
router.post("/friend/:userId", addFriendHandler)
router.delete("/friend/:userId", deleteFriendHandler)

export default router