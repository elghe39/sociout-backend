import express from 'express'
import user from './user.routes.js'
import auth from './auth.routes.js'
// import friend from './friend.routes.js'

const router = express.Router()

router.get("/healthcheck", (_, res) => res.sendStatus(200))

router.use("/api/v1", user)
router.use("/api/v1", auth)
// router.use("/api/v1", friend)

export default router