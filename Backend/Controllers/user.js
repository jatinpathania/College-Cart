const user = require("../Model/user");
const bcrypt = require("bcryptjs");
const cookieToken = require("../util/cookies");
const Verify = require("../Model/emailVerification")
const { generateVerificationCode, sendVerificationEmail } = require("../util/emailConfig");
const User = require("../Model/user");
const { deleteFromCloudinary, uploadToCloudinary } = require("../Config/cloudinary");


exports.signup = async (req, res) => {

    try {
        const {cloudinaryId, name, username, email, password } = req.body;

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
                cloudinaryId,
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
                    cloudinaryId,
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
            cloudinaryId:verificationRecord.pendingUserData.cloudinaryId,
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

exports.updateProfileImageAndUserName = async(req, res) => {
    const {id} = req.params;
    const { username } = req.body;
    const profileImage = req.file; 
    
    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const updateFields = {};

       
        if (username) {
            if (username !== existingUser.username) {
                const usernameExists = await User.findOne({ 
                    username,
                    _id: { $ne: id } 
                });

                if (usernameExists) {
                    return res.status(400).json({
                        success: false,
                        message: "Username already taken"
                    });
                }
                updateFields.username = username;
            }
        }
     
        if (profileImage) {
            try {
                if (existingUser.cloudinaryId) {
                    await deleteFromCloudinary(existingUser.cloudinaryId);
                }

                const cloudinaryResponse = await uploadToCloudinary(profileImage);
        
                if (cloudinaryResponse && cloudinaryResponse.url) {
                    updateFields.profileImage = cloudinaryResponse.url;
                    updateFields.cloudinaryId = cloudinaryResponse.public_id;
                } else {
                    throw new Error("Failed to get valid response from Cloudinary");
                }
            } catch (uploadError) {
                console.error("Upload error:", uploadError); 
                return res.status(400).json({
                    success: false,
                    message: "Error uploading image",
                    error: uploadError.message
                });
            }
        }

        
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields to update"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                username: updatedUser.username,
                profileImage: updatedUser.profileImage,
                cloudinaryId: updatedUser.cloudinaryId
            }
        });

    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating profile",
            error: error.message
        });
    }
}