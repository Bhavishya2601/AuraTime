import dotenv from 'dotenv'
dotenv.config()

import { db } from '../index.js'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

const saltRounds = parseInt(process.env.SALT_ROUNDS)

const expiryTime = 10 * 60 * 1000;
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

let otpStore = {}

const User = {
    create: async (userData) => { // register
        await db.query(`
            CREATE TABLE IF NOT EXISTS users_account (
                id SERIAL PRIMARY KEY,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(200) NOT NULL
                );
        `)
        const { email } = userData


        let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])
        let user = result.rows[0]

        if (result.rows.length > 0) {
            throw 'User Already Exists'
        } else {

            const otp = generateOTP()
            const generateAt = Date.now()

            otpStore[email] = { otp, generateAt }


            const mailOptions = {
                from: process.env.EMAIL_PASS,
                to: email,
                subject: 'Your OTP',
                text: `Your OTP is ${otp}`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('error while verifing otp')
                    return 'error while verifing otp'
                }
                console.log('mail send')
            })

            return 'otp send successfully'
        }
    },

    verifyOtp: async (userData) => { // verify otp while registration
        const { fName, lName, email, password, otp } = userData
        const currentTime = Date.now()

        if (otpStore[email]) {
            const { otp: storeOTP, generateAt } = otpStore[email]
            if (currentTime - generateAt > expiryTime) {
                console.log('otp expired')
                delete otpStore[email]
                throw 'otp expired'
            }

            if (parseInt(otp) === parseInt(storeOTP)) {
                console.log('verified successfully')

                try {
                    const hash = await bcrypt.hash(password, saltRounds)

                    const res = await db.query('INSERT INTO users_account (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *', [fName, lName, email, hash])

                    return res.rows[0]
                } catch (err) {
                    console.log('Error while inserting data into database', err.message)
                }

            } else {
                console.log('invalid otp')
                throw 'invalid otp'
            }
        } else {
            console.log('No otp found')
        }
    },

    read: async (userData) => { // login
        const { email, password } = userData

        let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])
        let user = result.rows[0]

        if (result.rows.length > 0) {
            const cpass = await bcrypt.compare(password, user.password);
            if (cpass) {
                console.log('verified')
                return user;
            } else {
                console.log('Wrong password')
                throw 'Wrong password'
            }
        } else {
            console.log('User not found')
            throw 'User not found'
        }
    }
}

export default User;