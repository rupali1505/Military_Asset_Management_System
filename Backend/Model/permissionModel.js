const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    action: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("permission",permissionSchema)