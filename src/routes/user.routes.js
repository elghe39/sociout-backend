import express from 'express'
import { validation } from './../middleware/validate.middleware.js'
import { createUserSchema } from '../schema/user.schema.js'
import { createUserHandler } from '../controller/user.controller.js'

const router = express.Router()

router.post("/user", validation(createUserSchema), createUserHandler)

export default router