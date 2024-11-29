import express from "express";
import {db} from '../index.js'
import {editProfile, deleteAccount} from '../controllers/profileController.js'

const router = express.Router()

router.post('/edit', editProfile)
router.post('/delete', deleteAccount)

router.get('/data', async (req, res)=>{
    const {id} = req.query
    try{
        const response = await db.query('SELECT * FROM users_account WHERE id=$1', [id])
        return res.json(response.rows[0])
    } catch (err){
        console.log(err)
        res.status(404).json({error: 'profile data not fetched'})
    }
})

export default router