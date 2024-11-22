import express from 'express'
const router = express.Router()
import {getAllWatches} from '../controllers/watchController.js'

router.get('/', getAllWatches)

export default router