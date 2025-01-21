const getJwtToken = require("../Token/jwt")

const cookieToken = (user,res)=>{
    const token = getJwtToken.jwtToken(user.id);

    const option = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
        secure:true,
        sameite:"Strict"
    }
    user.password=undefined;

    res.cookie('token',token, option);
    return token;
}
module.exports = cookieToken