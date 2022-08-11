import express from 'express'
import { validation } from './../middleware/validate.middleware.js'
import { createUserSchema, changePasswordSchema, changeAvatarSchema, changeProfileSchema, forgetPasswordSchema, resetPasswordSchema } from '../schema/user.schema.js'
import { changeAvatarHandler, changePasswordHandler, changeProfileHandler, createUserHandler, forgetPasswordHandler, getMeHandler, getProfileHandler, resetPasswordHandler } from '../controller/user.controller.js'
import { authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/user", validation(createUserSchema), createUserHandler)
router.post("/user/change-password", validation(changePasswordSchema),  authorize, changePasswordHandler)
router.get("/user", authorize, getMeHandler)
router.get("/user/:userId", authorize, getProfileHandler)
router.put("/user/change-avatar", validation(changeAvatarSchema), authorize, changeAvatarHandler)
router.put("/user", validation(changeProfileSchema), authorize, changeProfileHandler)
router.post("/forget-password", validation(forgetPasswordSchema), forgetPasswordHandler)
router.post("/reset-password", validation(resetPasswordSchema), resetPasswordHandler)

export default router