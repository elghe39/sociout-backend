import express from 'express'
import { addFollowHandler, deleteFollowHandler, getFollowedListHandler, getFollowListHandler, getFollowingListHandler } from '../controller/follow.controller.js'
import { validateUserId } from '../middleware/validate.middleware.js'
import { authorize } from './../middleware/auth.middleware.js'

const router = express.Router()

router.use(authorize)
router.post("/follows", validateUserId, addFollowHandler)
router.delete("/follows", validateUserId, deleteFollowHandler)
router.get("/follows", getFollowListHandler)
router.get("/followed", getFollowedListHandler)
router.get("/follows/:userId", validateUserId, getFollowingListHandler)

export default router