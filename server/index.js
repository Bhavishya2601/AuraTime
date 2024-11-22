import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cors from 'cors'
import pg from 'pg'
import session from 'express-session';
import pgSession from 'connect-pg-simple'
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import apiRouter from './routes/watch.js'

const app = express();
const port = process.env.PORT
const PgSession = pgSession(session)

// checking if any database variable is missing
const requiredEnv = ['DB_USER', 'DB_HOST', 'DB_PASSWORD', 'DB_DATABASE', 'DB_PORT'];
requiredEnv.forEach((env) => {
    if (!process.env[env]) {
        console.error(`Error: ${env} is not defined in the environment variables.`);
        process.exit(1);
    }
});

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
        console.log(err.message, "Error starting backend")
        process.exit(1)
    }
}

startServer()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(cors({
    origin: `${process.env.FRONTEND_URL || 'http://localhost:5173'}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(session({
    store: new PgSession({
        pool: db,
        tableName: 'session',
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        sameSite: 'Lax'
    }
}))

app.get('/', (req, res)=>{
    res.send('Backend Started')
})

app.use('/api/v1/user', userRouter)
app.use('/auth', authRouter)
app.use('/watch', apiRouter)

export {db}
export default app;