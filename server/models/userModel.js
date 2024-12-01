import dotenv from 'dotenv'
dotenv.config()
import { db } from '../index.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { otpTemplate } from '../mailTemplates/otpVerificationTemplate.js'
import { forgetPasswordTemplate } from '../mailTemplates/forgotPasswordTemplate.js'
import mailSender from '../utils/mailSender.js'

const saltRounds = parseInt(process.env.SALT_ROUNDS)

const expiryTime = 10 * 60 * 1000;
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}



let otpStore = {}

const sendMail = (userData) => {

    const { email, fName, lName } = userData
    const otp = generateOTP()
    const generateAt = Date.now()

    otpStore[email] = { otp, generateAt }

    const subject = 'Auratime - Verify your email address'
    const htmlContent = otpTemplate(otp, `${fName} ${lName}`)
    mailSender(email, subject, htmlContent)
    return email
}

const User = {
    create: async (userData) => {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users_account (
                id SERIAL PRIMARY KEY,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(200) NOT NULL,
                login_method VARCHAR(20) NOT NULL,
                location VARCHAR(255),
                profile_image_url VARCHAR(255)
                );
        `)
        const { email, fName, lName } = userData


        let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])

        if (result.rows.length > 0) {
            console.log('User already exists')
            throw new Error('User Already Exists')
        } else {

            return sendMail(userData)
        }
    },

    verifyOtp: async (userData) => {
        const { fName, lName, email, password, otp } = userData
        const currentTime = Date.now()

        if (otpStore[email]) {
            const { otp: storeOTP, generateAt } = otpStore[email]
            if (currentTime - generateAt > expiryTime) {
                console.log('otp expired')
                delete otpStore[email]
                throw new Error('otp expired')
            }

            if (parseInt(otp) === parseInt(storeOTP)) {
                console.log('verified successfully')

                try {
                    const hash = await bcrypt.hash(password, saltRounds)

                    const res = await db.query('INSERT INTO users_account (firstname, lastname, email, password, login_method) VALUES($1, $2, $3, $4, $5) RETURNING *', [fName, lName, email, hash, "local"])

                    return res.rows[0]
                } catch (err) {
                    console.log(err)
                    console.log('Error while inserting data into database', err.message)
                    throw new Error('Error while inserting data into Database')
                }

            } else {
                console.log('invalid otp')
                throw new Error('invalid otp')
            }
        } else {
            throw new Error('No otp found')
        }
    },

    otp_resend: async (userData) => {
        return sendMail(userData)
    },

    forgotPassword: async (data, req) => {
        try {
            const { email } = data

            const result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])

            if (result.rows.length === 0) {
                throw new Error('User doesn\'t exist')
            }

            const userData = result.rows[0]
            const token = crypto.randomBytes(20).toString('hex')
            const expiry = new Date(Date.now() + 600000)

            await db.query(`CREATE TABLE IF NOT EXISTS password_resets (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            token VARCHAR(255) NOT NULL,
            expires TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`)

            await db.query('DELETE FROM password_resets WHERE email = $1', [email]);
            await db.query('INSERT INTO password_resets(email, token, expires) VALUES($1, $2, $3)', [email, token, expiry])
            const resetLink = `${process.env.FRONTEND_URL}/reset/${token}`

            const htmlContent = forgetPasswordTemplate(resetLink, `${userData.firstname} ${userData.lastname}`, new Date())
            const subject = 'Auratime - Password Reset Request'
            mailSender(email, subject, htmlContent)
        } catch (err) {
            console.log('hello')
            console.log(err)
            throw err
        }

    },
    ResetPassword: async (userData) => {
        const {token, newPassword} = userData

        try{
            const result = await db.query('SELECT * FROM password_resets WHERE token=$1', [token])
            
            if (result.rows[0].expires < Date.now()){
                console.log('Token Expired')
                throw new Error('Token expired')
            }
            const hash = await bcrypt.hash(newPassword, saltRounds)
            await db.query('UPDATE users_account SET password=$1 WHERE email=$2', [hash, result.rows[0].email])
        } catch (err){
            console.log(err.message)
            throw new Error(err.message)
        }
    }
}

export default User;