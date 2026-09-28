const mongoose = require("mongoose");

const expenditureSchema = new mongoose.Schema(
    {
        baseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "base",
            required: true
        },

        equipmentTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "equipmentType",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        expenditureDate: {
            type: Date,
            required: true
        },

        reason: {
            type: String,
            required: true,
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("expenditure", expenditureSchema);