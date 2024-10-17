import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cors from 'cors'
import pg from 'pg'

import userRouter from './routes/user.js'

const app = express();
const port = process.env.PORT



const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

const startServer = () =>{
    try{
        db.connect()
        app.listen(port || 8080, ()=>{
            console.log(`Server running at port ${port}`)
        })
    } catch (err){
        console.log(err.message)
        console.log("Error starting backend")
    }
}

startServer()

app.use(cors({
    origin: `${process.env.FRONTEND_URL || '*'}`,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.send('Backend Started')
})

app.use('/api/v1/user', userRouter)

export {db}