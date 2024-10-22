import dotenv from 'dotenv'
dotenv.config()

import {db} from '../index.js'

import axios from 'axios'
import express from 'express'
import passport from 'passport';
import session from 'express-session';
import GoogleStrategy from 'passport-google-oauth2'
import GithubStrategy from 'passport-github2'
import DiscordStrategy from 'passport-discord'

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

router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}))

router.get('/github/main', passport.authenticate("github", {
    successRedirect : `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
}))

router.get('/discord', passport.authenticate('discord'))

router.get('/discord/main', passport.authenticate('discord', {
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
}))

passport.use('google', new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : "/auth/google/main",
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

passport.use('github', new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/main'
}, async (accessToken, refreshToken, profile, cb)=>{
    let {displayName:name, id} = profile

    let parts = name.split(' ')
    let firstname = parts[0]
    let lastname = parts.slice(1).join(" ")

    try{
        const {data: emails} = await axios.get('https://api.github.com/user/emails', {
            headers: {Authorization: `token ${accessToken}`}
        })
        const email = emails.find(email => email.primary && email.verified)?.email
        try{
            let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])
            if (result.rows.length == 0){
                let newUser = await db.query('INSERT INTO users_account (firstname, lastname, email, password, login_method) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstname,lastname, email, id, "github"])
                console.log("data saved in database")
                return cb(null, newUser.rows[0])
            } else {
                return cb(null, result.rows[0])
            }
        } catch (err){
            console.log("Error while inserting data into database")
            console.log(err.message)
            cb(err)
        }
    } catch(err) {
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
}, async (accessToken, refreshToken, profile, cb)=>{
    let {global_name: name, email, id} = profile
    let parts = name.split(' ')
    let firstname = parts[0]
    let lastname = parts.slice(1).join(' ')

    try{
        let result = await db.query('SELECT * FROM users_account WHERE email = $1', [email]);
        
        if (result.rows.length == 0){
            let newUser = await db.query('INSERT INTO users_account (firstname, lastname, email, password, login_method) VALUES ($1, $2, $3, $4, $5) RETURNING *',[firstname, lastname, email, id, "discord"]);
            return cb(null, newUser.rows[0])
        } else {
            return cb(null, result.rows[0])
        }
    } catch (err){
        cb(err)
    }
}))

passport.serializeUser((user, cb)=>{
    cb(null, user)
})

passport.deserializeUser((user, cb)=>{
    cb(null, user)
})

export default router