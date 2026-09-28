const mongoose = require("mongoose");

const transactionLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        action: {
            type: String,
            required: true
        },

        module: {
            type: String,
            required: true
        },

        details: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("transactionLog",transactionLogSchema);