import dotenv from 'dotenv'
dotenv.config()

import {db} from '../index.js'

import express from 'express'
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2'
import session from 'express-session';

const router = express();

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

router.use(passport.initialize())
router.use(passport.session())

router.get('/google', passport.authenticate("google", {
    scope: ['profile', 'email']
}))

router.get('/google/main', passport.authenticate("google", {
    successRedirect : `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
}))

passport.use('google', new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.GOOGLE_CALLBACK,
}, async (accessToken, refreshToken, profile, cb)=>{
    let {given_name: firstname, family_name: lastname, email, id} = profile
    
    try{
        let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])
        
        if (result.rows.length == 0){
            let newUser = await db.query('INSERT INTO users_account (firstname, lastname, email, password, login_method) VALUES($1, $2, $3, $4, $5) RETURNING *', [firstname, lastname, email, id, "google"])
            return cb(null, newUser.rows[0])
        } else {
            return cb(null, result.rows[0])
        }
    } catch (err){
        console.log('Something went wrong while logging through Google')
        cb(err);
    }
}))

passport.serializeUser((user, cb)=>{
    cb(null, user)
})

passport.deserializeUser((user, cb)=>{
    cb(null, user)
})

export default router