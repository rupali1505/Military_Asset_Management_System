const permission = require("../Model/permissionModel");
const rolePermission = require("../Model/rolePermission")

const checkPermission = (subject,action)=>{
    
    return async(req,res,next)=>{
        try {
            console.log(subject, action)
            const permissionData = await permission.findOne({
                subject: subject,
                action: action
            })
            console.log(permissionData,'permission data')
            if (!permissionData) {
                return res.status(400).json({
                    status: false,
                    msg: "permission not found"
                })
            }
            
            const rolePermissionData = await rolePermission.findOne({
                roleId: req.user.roleId,
                permissionId: permissionData._id
            })
            
            if (!rolePermissionData) {
                return res.status(403).json({
                    status: false,
                    msg: "You do not have a permission"
                })
            }
            
            next();
        } catch (error) {
            res.status(403).json({
                status: false,
                msg: error.message
            })
        }
    }

}

module.exports = checkPermission