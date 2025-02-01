const user = require("../Model/user");
const bcrypt = require("bcryptjs");
const cookieToken = require("../util/cookies");
const Verify = require("../Model/emailVerification")
const { generateVerificationCode, sendVerificationEmail } = require("../util/emailConfig");
const User = require("../Model/user");


exports.signup = async (req, res) => {

    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const requiredCharacters = "chitkarauniversity.edu.in";
        if (!email.includes(requiredCharacters)) {
            return res.status(400).json({ message: "Please enter the valid chitkara university email address" })
        }

        const prevsEmail = await user.findOne({ email });
        if (prevsEmail) {
            return res.status(400).json({ message: "Already email exits" });
        }

        const existingUsername = await user.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast of 8 characters" });
        }

        const verificationCode = generateVerificationCode();
        const existingVerification = await Verify.findOne({email});
        if(existingVerification){
            existingVerification.code = verificationCode;
            existingVerification.pendingUserData={
                name,
                username,
                email,
                password
            };
            existingVerification.createdAt = new Date();
            await existingVerification.save();
        }else{

            await Verify.create({
                email,
                code: verificationCode,
                pendingUserData: {
                    name,
                    username,
                    email,
                    password
                },
                createdAt: new Date()
            });

        }
        
        await sendVerificationEmail(email, verificationCode,name);

        return res.status(201).json({ message: "Verification code sent to your email. Please verify to complete registration." });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error during verification process" })
    }
}


exports.verifyEmail = async (req, res) => {
    const { email, code } = req.body;

    try {
        if (!email || !code) {
            return res.status(400).json({
                success: false,
                message: "Email and verification code are required"
            });
        }

        const verificationRecord = await Verify.findOne({ email });

        if (!verificationRecord) {
            return res.status(400).json({
                success: false,
                message: "Verification code not found. Please request a new code."
            });
        }
        const thirtyMinute = 30 * 60 * 1000;
        if (new Date() - new Date(verificationRecord.createdAt) > thirtyMinute) {
            await Verify.findOneAndDelete({ email });
            return res.status(400).json({ message: "Verification code has expired. Please try again" });
        }


        if (verificationRecord.code !== code) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code. Please try again.'
            });
        }
      
        const hashPassword = await bcrypt.hash(verificationRecord.pendingUserData.password, 10);
        const userCreate = await user.create({
            name: verificationRecord.pendingUserData.name,
            username: verificationRecord.pendingUserData.username,
            email: verificationRecord.pendingUserData.email,
            password: hashPassword,
            isVerified: true
        });

        await Verify.findOneAndDelete({ email });
        const token =   cookieToken(userCreate, res);
        return res.status(201).json({
            message: "Account created successfully!",
            user: userCreate,
            token
        });
     

    } catch (error) {
        console.error('Email verification error:', error);
        return res.status(500).json({ message: "Error during account creation" });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Email does not exist" });
        }
        if (!existingUser.isVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password." });
        }

       const token = cookieToken(existingUser, res);
        return res.status(201).json({ message: "Login successful!", user: existingUser,token })
    } catch (error) {
        return res.status(500).json({ message: "Error during  login" })
    }
}


exports.updatePassword=async(req,res)=>{
    // const {id} = req.params;
    const {password} = req.body;
    if (!password || password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
      }
    try {
        // const user = await User.findOne({
        //     _id:id
        // })
        // if (!user) {
        //     return res.status(404).json({ error: 'User not found' });
        //   }

        const hashPassword = await bcrypt.hash(password,10);
        const updatedUser = await User.updateOne(
            // {
            //     _id:id
            // },
             {password:hashPassword}
          );
       res.status(200).json({ message: 'Password updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}