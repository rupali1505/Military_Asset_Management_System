const role = require("../Model/roleModel");
const base = require("../Model/baseModel");
const user = require("../Model/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userAuthService {

    registerUser = async ({ name, email, password, roleName, baseName }) => {
        const roleData = await role.findOne({
            role: roleName
        });
        if (!roleData) {
            throw new Error("Role Not Found")
        }

        let baseData = null;

        if (roleName !== "admin") {

            baseData = await base.findOne({
                name: baseName
            });

            if (!baseData) {
                throw new Error("Base not found");
            }
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const userData = new user({ name, email, password: hashPassword, roleId: roleData._id, baseId: baseData ? baseData._id : null });
        const response = await userData.save()
        return response
    }

    logInUser = async ({ email, password }) => {
        const userData = await user.findOne({ email });

        if (!userData) {
            throw new Error("User Not Found")
        }
        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            throw new Error("Invalid Password")
        }

        const roleData = await role.findById(userData.roleId);

        const payload = {
            userId: userData._id,
            roleId: userData.roleId,
            roleName: roleData.role,
            baseId: userData.baseId
        };
        const secret = process.env.secret
        const token = await jwt.sign(payload, secret, { expiresIn: "30d" });
        return token
    }
}

module.exports = new userAuthService()