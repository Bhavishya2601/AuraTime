import express from 'express'
import {signup, verify_otp, otp_resend, forgotPassword, ResetPassword} from '../controllers/userController.js'

import { db } from '../index.js'
import jwt from 'jsonwebtoken'
import passport from 'passport';

const router = express.Router()

router.use(passport.initialize())
router.use(passport.session())

router.post('/signup', signup)
router.post('/verify_otp', verify_otp)
router.post('/resend-otp', otp_resend)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', ResetPassword)

router.get('/checkUser', (req, res)=>{
    const token = req.cookies.jwt
    if (!token){
        console.log('No user found')
        return res.status(401).json({message: 'UnAuthorized No token found'})
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
        if (err) return res.status(401).json({message: 'Unauthorized, invalid token'})

        try{
            const result = await db.query('SELECT id, email FROM users_account WHERE id=$1', [decoded.id])
            const user = result.rows[0]
            res.json({user})
        } catch (err){
            console.log('something went wrong')
            res.status(500).json({message: 'Error retrieving user data'})
        }
    })
})

router.post('/logout', (req, res)=>{
    try{

        res.cookie('jwt', '', {
            httpOnly: true,
            secure: true,
            maxAge: 0,
            sameSite: 'None'
        })
        res.status(200).json({message: 'Successfully Logged Out'})
    } catch (err){
        console.log(err.message)
        res.status(404).json({error: 'Something Went Wrong'})
    }
})

export default router