const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        baseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "base",
            required: true
        },

        equipmentTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "equipmenttype",
            required: true
        },

        personnelName: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        assignmentDate: {
            type: Date,
            required: true
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

module.exports = mongoose.model("assignment", assignmentSchema);