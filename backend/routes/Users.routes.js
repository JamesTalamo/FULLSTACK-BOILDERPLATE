import express from 'express'
const router = express.Router()
import { LoginUser, RegisterUser, LogoutUser, getMe } from '../controller/Auth.controller.js'
import protectRoutes from '../mw/protectRoutes.js'

router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.get('/logout', LogoutUser)
router.get('/me', protectRoutes, getMe)

export default router