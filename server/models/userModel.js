import dotenv from 'dotenv'
dotenv.config()

import { db } from '../index.js'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

import { otpTemplate } from '../mailTemplates/otpVerificationTemplate.js'

const saltRounds = parseInt(process.env.SALT_ROUNDS)

const expiryTime = 10 * 60 * 1000;
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

let otpStore = {}

const sendMail = (userData) =>{
    console.log(process.env.EMAIL_PASS, process.env.EMAIL_USER, email, otp)

    const { email, fName, lName } = userData
    const otp = generateOTP()
    const generateAt = Date.now()
    console.log('OTP generated')

    otpStore[email] = { otp, generateAt }

    const htmlContent = otpTemplate(otp, `${fName} ${lName}`)
    console.log('mailOptions')
    const mailOptions = {
        from: process.env.EMAIL_PASS,
        to: email,
        subject: 'Verify your email address for AuraTime',
        html: htmlContent
    }

    console.log('transporter')
    console.log(process.env.EMAIL_PASS, process.env.EMAIL_USER, email, otp)
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            console.log('error while sending otp')
            throw new Error('error while sending otp')
        }
        console.log('mail send')
    })
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
                login_method VARCHAR(20) NOT NULL
                );
        `)
        const { email, fName, lName } = userData


        let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])

        if (result.rows.length > 0) {
            console.log('User already exists')
            throw new Error('User Already Exists')
        } else {
            console.log(process.env.EMAIL_PASS, process.env.EMAIL_USER, email, otp)

            sendMail(userData)

            return email
        }
    },

    verifyOtp: async (userData) => { 
        console.log('Entered verify')
        const { fName, lName, email, password, otp } = userData
        const currentTime = Date.now()
        console.log('Found otp route')

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
    }

    // read: async (userData) => { // login
    //     const { email, password } = userData

    //     let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])
    //     let user = result.rows[0]

    //     if (result.rows.length > 0) {
    //         const cpass = await bcrypt.compare(password, user.password);
    //         if (cpass) {
    //             console.log('verified')
    //             return user;
    //         } else {
    //             console.log('Wrong password')
    //             throw 'Wrong password'
    //         }
    //     } else {
    //         console.log('User not found')
    //         throw 'User not found'
    //     }
    // }
}

export default User;