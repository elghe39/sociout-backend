import express from 'express'
import { addFollowHandler, deleteFollowHandler, getFollowedListHandler, getFollowListHandler, getUserFollowListHandler } from '../controller/follow.controller.js'
import { validateUserId } from '../middleware/validate.middleware.js'
import { authorize } from './../middleware/auth.middleware.js'

const router = express.Router()

router.use(authorize)
router.post("/follow/:userId", validateUserId, addFollowHandler)
router.delete("/follow/:userId", validateUserId, deleteFollowHandler)
router.get("/follow", getFollowListHandler)
router.get("/followed", getFollowedListHandler)
router.get("/follow/:userId", validateUserId, getUserFollowListHandler)

export default router