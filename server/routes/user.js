import express from 'express'
import {signup} from '../controllers/userController.js'
// import { login } from '../controllers/userController.js'
import { verify_otp } from '../controllers/userController.js'

import { protect } from '../middlewares/user.middleware.js'

const router = express.Router()

router.post('/signup', signup)
// router.post('/login', login)
router.post('/verify_otp', verify_otp)

router.get('/dashboard', protect, (req, res)=>{
    res.json({message: `Welcome ${req.user.email} to your Dashboard`, user: req.user})
})

export default router