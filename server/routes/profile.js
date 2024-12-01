import express from "express";
import {db} from '../index.js'
import {editProfile, deleteAccount, imageUpload} from '../controllers/profileController.js'
import multer from "multer";

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({storage : storage})

router.post('/edit', editProfile)
router.post('/delete', deleteAccount)
router.post('/imgUpload', upload.single('image'), imageUpload)

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