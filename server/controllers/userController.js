import User from '../models/userModel.js'

export const signup = async (req, res)=>{
    try{
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (err){
        console.log(err)

        if (err.code === '23505') {  // Postgres error code for unique violation
            return res.status(400).json({ error: 'Email already exists' });
        }

        res.status(500).json({error: 'Failed to create user'})
    }
}

export const login = async (req, res) =>{
    try{
        const result = await User.read(req.body)
        res.status(200).json(result)
    } catch (err){
        console.log(err)
        res.status(404).json({error: 'User doesn\'t exist or wrong password'})
    }
}