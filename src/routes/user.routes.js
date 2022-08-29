import express from 'express'
import { validation } from './../middleware/validate.middleware.js'
import { createUserSchema, changePasswordSchema, changeAvatarSchema, changeProfileSchema, forgetPasswordSchema, resetPasswordSchema } from '../schema/user.schema.js'
import { changeAvatarHandler, changeCoverHandler, changePasswordHandler, changeProfileHandler, createUserHandler, forgetPasswordHandler, getMeHandler, getProfileHandler, resetPasswordHandler } from '../controller/user.controller.js'
import { authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/user", validation(createUserSchema), createUserHandler)
router.post("/user/password", validation(changePasswordSchema),  authorize, changePasswordHandler)
router.get("/user", authorize, getMeHandler)
router.get("/user/:userId", authorize, getProfileHandler)
router.put("/user/avatar", validation(changeAvatarSchema), authorize, changeAvatarHandler)
router.put("/user/profile", validation(changeProfileSchema), authorize, changeProfileHandler)
router.post("/user/forget-password", validation(forgetPasswordSchema), forgetPasswordHandler)
router.post("/user/reset-password", validation(resetPasswordSchema), resetPasswordHandler)
router.put("/user/cover", authorize, changeCoverHandler)

export default router