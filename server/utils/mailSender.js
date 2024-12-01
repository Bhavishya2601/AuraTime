import nodemailer from 'nodemailer'

const mailSender = async (email, subject, htmlContent) => {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        const mailOptions = {
            from: `Auratime <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: htmlContent
        }
    
        let info = await transporter.sendMail(mailOptions)
        console.log(info)
        return info
    } catch (err){
        console.log('Error sending Mail', err.message)
        throw new Error(err.message)
    }
}

export default mailSender