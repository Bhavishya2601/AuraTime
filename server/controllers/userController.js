import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )
}

export const signup = async (req, res)=>{
    try{
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)   
    } catch (err){
        console.log(err)

        if (err.code === '23505') {  // Postgres error code for unique violation
            return res.status(400).json({ error: 'Email already exists' });
        }

        res.status(404).json({error: 'Failed to create user'})
    }
}

export const verify_otp = async (req, res) =>{
    try{
        const result = await User.verifyOtp(req.body)
        const token = generateToken(result)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'None'
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(404).json({error: 'OTP verification failed'})
    }
}

export const otp_resend = async (req, res) =>{
    try{
        const result = await User.otp_resend(req.body)
        res.status(200).json(result)
    } catch (err){
        console.log(err)
        res.status(404).json({error: 'Something went wrong'})
    }
}