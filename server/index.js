import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cors from 'cors'
import pg from 'pg'

const app = express();
const port = process.env.PORT

console.log(process.env.FRONTEND_URL)
app.use(cors({
    origin: `${process.env.FRONTEND_URL || '*'}`,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const startServer = () =>{
    try{
        const db = new pg.Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        })
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

app.get('/', (req, res)=>{
    res.send('Backend Started')
})

app.post('/api/v1/user/signup', (req, res)=>{
    const {username, password} = req.body

    console.log(username, password)
})