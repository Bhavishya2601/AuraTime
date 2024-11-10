import express from 'express'
const router = express.Router()
import {getAllWatches, addWatches} from '../controllers/userController.js'

router.get('/', getAllWatches)

router.post('/', addWatches)

export default router