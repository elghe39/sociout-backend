import express from 'express'
import { addFollowHandler, deleteFollowHandler, getFollowedListHandler, getFollowListHandler, getFollowingListHandler } from '../controller/follow.controller.js'
import { validateUserId } from '../middleware/validate.middleware.js'
import { authorize } from './../middleware/auth.middleware.js'

const router = express.Router()

router.use(authorize)
router.post("/follow", validateUserId, addFollowHandler)
router.delete("/follow", validateUserId, deleteFollowHandler)
router.get("/follow", getFollowListHandler)
router.get("/followed", getFollowedListHandler)
router.get("/follow/:userId", validateUserId, getFollowingListHandler)

export default router