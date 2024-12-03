import { JSONCookie } from 'cookie-parser'
import { db } from '../index.js'
import bcrypt from 'bcrypt'
import { passwordUpdated } from '../mailTemplates/passwordUpdateEmailTemplate.js'
import mailSender from '../utils/mailSender.js'

const saltRounds = parseInt(process.env.SALT_ROUNDS)

const profile = {
    edit: async (userData) => {
        const { email, password, firstname, lastname } = userData.data
        const { current: currentPass, new: newPass } = userData.pass
        try {
            const isMatch = await bcrypt.compare(currentPass, password)

            if (!isMatch) {
                throw new Error('Current Password didn\'t Match')
            }
            console.log('password matched')

            const hash = await bcrypt.hash(newPass, saltRounds)
            db.query('UPDATE users_account SET password = $1 WHERE email = $2', [hash, email])

            const htmlContent = passwordUpdated(`${firstname} ${lastname}`, new Date())

            const subject = 'Auratime - Your Password Has Been Successfully Updated'
            await mailSender(email, subject, htmlContent)

            return { success: true, message: 'Password Changed Successfully' }
        } catch (err) {
            throw new Error(err.message)
        }
    },
    delete: async (userData) => {
        const { id } = userData.data

        const triggerResult = await db.query(`SELECT EXISTS (
            SELECT 1 
            FROM pg_trigger 
            WHERE tgname = 'before_account_delete'
            );`
        )
        const triggerExist = triggerResult.rows[0].exists

        await db.query(`CREATE TABLE IF NOT EXISTS deleted_accounts(
            id SERIAL PRIMARY KEY, 
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,  
            password VARCHAR(200) NOT NULL,
            login_method VARCHAR(20) NOT NULL,
            location VARCHAR(255),
            deleted_at TIMESTAMP DEFAULT NOW()
            );`)

        if (!triggerExist) {
            await db.query(`
                CREATE OR REPLACE FUNCTION log_deleted_accounts()
                RETURNS TRIGGER AS $$
                BEGIN 
                    INSERT INTO deleted_accounts SELECT OLD.*, NOW();
                    RETURN OLD;
                END;
                $$ LANGUAGE plpgsql;
            `)
            await db.query(`
                CREATE TRIGGER before_account_delete
                BEFORE DELETE ON users_account
                FOR EACH ROW
                EXECUTE FUNCTION log_deleted_accounts();    
            `)
        }

        try {
            await db.query('DELETE FROM users_account WHERE id=$1', [id])
            return { message: 'Account Deleted' }

        } catch (err) {
            console.log(err.message)
            throw new Error(err.message)
        }

    },
    upload : async (userData) => {
        const {id, imgURL} = userData
        try{
            await db.query(
                `UPDATE users_account SET profile_image_url = $1 WHERE id=$2`, [imgURL, id]
            )
            return {success: true, message: 'Profile image uploaded Successfully'}
        } catch (err){
            console.log(err.message)
            throw new Error(err.message)
        }
    }
}

export default profile