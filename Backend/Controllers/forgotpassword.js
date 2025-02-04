const emailVeirfyForPassword = require("../Model/emailVerifyForNewPassword");
const User = require("../Model/user");
const {generateVerificationCode, sendVerificationEmail} = require("../util/forgotPasswordEmailConfig");

const sendCode = async(req,res)=>{
    const {email} = req.body;
    try {
        if(!email){
            return res.status(400).json({messgae:"Email is required"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        const verificationCode = generateVerificationCode();

        await emailVeirfyForPassword.findOneAndUpdate(
            {email},
            {
                verificationCode,
                expiresAt: new Date(Date.now() + 30 * 60 * 1000)
            },
            {upsert:true,new:true}
        )

        await sendVerificationEmail(email,verificationCode, user.name);
        res.status(200).json({ message: 'Verification code sent successfully', expiresIn: '30 minutes' });
    } catch (error) {
        res.status(500).json({ error: 'Error during the verification sent code' });
    }
}

const verifyCode = async(req,res) =>{
   const {email, code} = req.body;
   try {
    const verification = await emailVeirfyForPassword.findOne({
       email,
       verificationCode:code,
       expiresAt: { $gt: new Date() }
    });

    if (!verification) {
        return res.status(400).json({ error: 'Invalid or expired code' });
    }

    await emailVeirfyForPassword.deleteOne({ _id: verification._id });
    res.status(200).json({ message: 'Code verified',verification });
   } catch (error) {
    res.status(500).json({ error: 'Error during verification' });
   }
}

module.exports={
    sendCode,
    verifyCode,
}