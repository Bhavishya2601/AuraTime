import dotenv from 'dotenv'
dotenv.config()

import { db } from '../index.js'
import bcrypt from 'bcrypt'

const saltRounds = parseInt(process.env.SALT_ROUNDS)

const User = {
    create: async (userData) => {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users_account (
                id SERIAL PRIMARY KEY,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(200) NOT NULL
                );
        `)  
        const {fName, lName, email, password} = userData
            
        const hash = await bcrypt.hash(password, saltRounds)

        const res = await db.query('INSERT INTO users_account (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *', [fName, lName, email, hash])

        return res.rows[0]

    },
    read: async (userData) =>{
        const {email, password} = userData

        let result = await db.query('SELECT * FROM users_account WHERE email=$1', [email])
        console.log(result)
        let user = result.rows[0]
        console.log(result.rows)
        

        if (result.rows.length > 0){
            const cpass = await bcrypt.compare(password, user.password);
            if (cpass){
                console.log('verified')
                return user;
            } else {
                console.log('Wrong password')
                throw 'Wrong password'
            }
        } else {
            console.log('User not found')
            throw 'User not found'
        }
    }
}

export default User;