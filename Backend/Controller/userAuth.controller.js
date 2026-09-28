const {registerUser,logInUser} = require("../Services/userAuth.service");

const register = async(req,res)=>{
    const {name,email,password,roleName,baseName} = req.body;
    try {
        const response = await registerUser({ name, email, password, roleName, baseName });
        res.status(200).json({
            status:true,
            msg:"User Register Successfully",
            data:response
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            msg:error.message
        })
    }
}

const logIn = async(req,res)=>{
try {
    const {email,password} = req.body;
    const response = await logInUser({email,password});
    res.status(200).json({
        status:true,
        msg:"logIn Successfull",
        token:response
    })
} catch (error) {
    res.status(500).json({
        status: false,
        msg: error.message,
        })
}
}

module.exports = {
    register,
    logIn
}