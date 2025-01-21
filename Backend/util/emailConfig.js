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

const sendVerificationEmail = async (email, code)=>{
    const mailOptions={
      from: process.env.EMAIL_USER, 
      to: email,
      subject: 'Email Verification - Chitkara University',
      text: `Your email verification code is: ${code}. This code is only 15 minutes\nPlease enter this code to verify your account.`
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
  