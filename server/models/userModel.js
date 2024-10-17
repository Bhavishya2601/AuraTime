import { db } from '../index.js'

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
        // console.log(fName, lName, email, password)

        const res = await db.query('INSERT INTO users_account (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *', [fName, lName, email, password])
        return res.rows[0]
    }
}

export default User;