import express from 'express'
import {signup, verify_otp, otp_resend} from '../controllers/userController.js'
// import { login } from '../controllers/userController.js'

import { db } from '../index.js'
import jwt from 'jsonwebtoken'
// import session from 'express-session'
import passport from 'passport';

const router = express.Router()

// router.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true
// }))

router.use(passport.initialize())
router.use(passport.session())

router.post('/signup', signup)
router.post('/verify_otp', verify_otp)
router.post('/resend-otp', otp_resend)

router.get('/checkUser', (req, res)=>{
    res.set('Cache-Control', 'no-store');
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

router.get('/profile', async (req, res)=>{
    const {id} = req.query
    try{
        const response = await db.query('SELECT * FROM users_account WHERE id=$1', [id])
        console.log(response.rows)
        return res.json(response.rows[0])
    } catch (err){
        console.log(err)
        res.status(404).json({error: 'profile data not fetched'})
    }
})

export default router