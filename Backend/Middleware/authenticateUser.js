const jwt = require("jsonwebtoken");
const user = require("../Model/userModel")
require("dotenv").config()

const authenticateUser = async(req,res,next)=>{
    try {
        
        const authHeader = req.headers.authorization;
      
        if(!authHeader){
            return res.status(401).json({
                status: false,
                msg: "Authorization header required"
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded =  jwt.verify(token,process.env.secret);
        const userData = await user.findById(decoded.userId);
        if (!userData) {
            return res.status(401).json({
                status: false,
                msg: "User not found"
            });
        }
        req.user = userData;

        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            msg: "Invalid token"
        });
    }
    }

module.exports = authenticateUser