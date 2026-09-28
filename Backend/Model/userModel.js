const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
        required: true
    },
    baseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "base",
        default: null
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User",userSchema)