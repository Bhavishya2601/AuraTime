import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import userRoutes from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.send('API is Running')
})

app.use('/api/v1/watch', userRoutes)

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`)
})