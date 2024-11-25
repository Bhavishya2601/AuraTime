import dotenv from 'dotenv'
dotenv.config()

import { db } from '../index.js'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import axios from 'axios'
import express from 'express'
import passport from 'passport';
import { Strategy } from 'passport-local'
import GoogleStrategy from 'passport-google-oauth2'
import GithubStrategy from 'passport-github2'
import DiscordStrategy from 'passport-discord'

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}

const router = express.Router();

router.use(passport.initialize())
router.use(passport.session())

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{
        
        if (err || !user){
            return res.status(400).json({
                message: 'Login Failed',
                error: info ? info.message : 'Invalid credentials'
            })
        }
        const token = generateToken(user)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'None'
        })
        
        return res.status(200).json({message: 'Login Successful', token})
    })(req, res, next)
})

router.get('/:provider/main', (req, res, next)=>{
    const {provider} = req.params

    if (!['discord', 'google', 'github'].includes(provider)){
        return res.redirect(`${process.env.FRONTEND_URL}/login`)
    }

    passport.authenticate(provider, (err, user, info)=>{
        if (err || !user){
            return res.redirect(`${process.env.FRONTEND_URL}/login`)
        }

        const token = generateToken(user)

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'None' 
        })
        return res.redirect(`${process.env.FRONTEND_URL}/dashboard`)
    })(req, res, next)
})

router.get('/google', passport.authenticate("google", {
    scope: ['profile', 'email']
}))

router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}))

router.get('/discord', passport.authenticate('discord'))

passport.use('local', new Strategy({ usernameField: 'email' }, async function verify(email, password, cb) {

    try {
        let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])
        let user = result.rows[0]

        if (result.rows.length > 0) {
            const cpass = await bcrypt.compare(password, user.password);
            if (cpass) {
                console.log('verified')
                cb(null, user)
            } else {
                console.log('Wrong password')
                cb('Wrong password')
            }
        } else {
            console.log('User not found')
            cb('User not found')
        }
    } catch (err) {
        cb(err)
    }
}))

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/main",
}, async (accessToken, refreshToken, profile, cb) => {
    let { given_name: firstname, family_name: lastname, email, id } = profile

    try {
        let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])

        if (result.rows.length == 0) {
            let newUser = await db.query('INSERT INTO users_account (firstname, lastname, email, password, login_method) VALUES($1, $2, $3, $4, $5) RETURNING *', [firstname, lastname, email, id, "google"])
            
            return cb(null, newUser.rows[0])
        } else {
            return cb(null, result.rows[0])
        }
    } catch (err) {
        console.error('Error logging in with Google:', err);
        cb(null, false, { message: 'Failed to log in with Google. Please try again later.' });
    }
}))

passport.use('github', new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/main'
}, async (accessToken, refreshToken, profile, cb) => {
    let { displayName: name, id } = profile

    let parts = name.split(' ')
    let firstname = parts[0]
    let lastname = parts.slice(1).join(" ")

    try {
        const { data: emails } = await axios.get('https://api.github.com/user/emails', {
            headers: { Authorization: `token ${accessToken}` }
        })
        const email = emails.find(email => email.primary && email.verified)?.email
        try {
            let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])
            if (result.rows.length == 0) {
                let newUser = await db.query('INSERT INTO users_account (firstname, lastname, email, password, login_method) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstname, lastname, email, id, "github"])
                console.log("data saved in database")
                return cb(null, newUser.rows[0])
            } else {
                
                return cb(null, result.rows[0])
            }
        } catch (err) {
            console.log("Error while inserting data into database")
            console.log(err.message)
            cb(err)
        }
    } catch (err) {
        console.log(err)
        console.log('Error while logging through github')
        cb(err)
    }
}))

passport.use('discord', new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: '/auth/discord/main',
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, cb) => {
    let { global_name: name, email, id } = profile
    let parts = name.split(' ')
    let firstname = parts[0]
    let lastname = parts.slice(1).join(' ')

    try {
        let result = await db.query('SELECT * FROM users_account WHERE email = $1', [email]);

        if (result.rows.length == 0) {
            let newUser = await db.query('INSERT INTO users_account (firstname, lastname, email, password, login_method) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstname, lastname, email, id, "discord"]);
            
            return cb(null, newUser.rows[0])
        } else {
            return cb(null, result.rows[0])
        }
    } catch (err) {
        cb(err)
    }
}))

passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((user, cb) => {
    cb(null, user)
})

export default router