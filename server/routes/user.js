import express from 'express'
import {signup} from '../controllers/userController.js'
import { login } from '../controllers/userController.js'
import { verify_otp } from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify_otp', verify_otp)

export default router