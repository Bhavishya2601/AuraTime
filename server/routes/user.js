import express from 'express'
import {signup} from '../controllers/userController.js'
// import { login } from '../controllers/userController.js'
import { verify_otp } from '../controllers/userController.js'

import { db } from '../index.js'
import jwt from 'jsonwebtoken'
import session from 'express-session'
import passport from 'passport';

const router = express.Router()

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

router.use(passport.initialize())
router.use(passport.session())

router.post('/signup', signup)
// router.post('/login', login)
router.post('/verify_otp', verify_otp)

router.get('/dashboard', (req, res)=>{
    const token = req.cookies.jwt
    if (!token){
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

router.get('/logout', (req, res) => {
    res.clearCookie('jwt', {path: '/', httpOnly: true, secure: true, sameSite: 'Strict', maxAge: -1 });

    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

export default router