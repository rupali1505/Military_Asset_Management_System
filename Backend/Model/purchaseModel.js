const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    baseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"base",
        required:true
    },
    equipmentTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"equipmentType",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    purchaseDate:{
        type:Date,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,

    }
})

module.exports = mongoose.model("purchase",purchaseSchema)