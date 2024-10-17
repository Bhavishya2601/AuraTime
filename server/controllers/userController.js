import User from '../models/userModel.js'

export const signup = async (req, res)=>{
    try{
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (err){
        console.log(err)
        res.status(500).json({error: 'Failed to create user'})
    }
}