import express from 'express'
import { validation } from './../middleware/validate.middleware.js'
import { createUserSchema, changeAvatarSchema, changeProfileSchema, forgetPasswordSchema, resetPasswordSchema } from '../schema/user.schema.js'
import { changeAvatarHandler, changeCoverHandler, changePasswordHandler, changeProfileHandler, createUserHandler, forgetPasswordHandler, getMeHandler, getProfileHandler, resetPasswordHandler } from '../controller/user.controller.js'
import { authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/users", validation(createUserSchema), createUserHandler)
router.put("/users/password", authorize, changePasswordHandler)
router.get("/users", authorize, getMeHandler)
router.get("/users/:userId", authorize, getProfileHandler)
router.put("/users/avatar", validation(changeAvatarSchema), authorize, changeAvatarHandler)
router.put("/users/profile", validation(changeProfileSchema), authorize, changeProfileHandler)
router.post("/users/forget-password", validation(forgetPasswordSchema), forgetPasswordHandler)
router.post("/users/reset-password", validation(resetPasswordSchema), resetPasswordHandler)
router.put("/users/cover", authorize, changeCoverHandler)

export default router