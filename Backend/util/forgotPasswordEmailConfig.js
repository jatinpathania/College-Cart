const nodemailer = require("nodemailer");
require('dotenv').config();

const generateVerificationCode = ()=>{
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
})

const sendVerificationEmail = async (email, code,name)=>{
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP for Email Verification and forgot password | Chitkara University',
    text: `Dear ${name},

Your One Time Password (OTP) for email verification is: ${code}

This OTP is valid for 15 minutes only.

Note: Please do not share this OTP with anyone.

Best Regards,
Chitkara University`
}
  
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
}

module.exports={
    generateVerificationCode,
    transporter,
    sendVerificationEmail
}
  