const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
    fromBaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "base",
        required: true
    },

    toBaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "base",
        required: true
    },

    equipmentTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipmenttype",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    transferDate: {
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
    })


    module.exports = mongoose.model("transfer",transferSchema)