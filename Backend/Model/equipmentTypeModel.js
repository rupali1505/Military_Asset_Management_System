const mongoose = require("mongoose");

const equipmentTypeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        enum:['vehicle','weapon','ammunition','other']
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("equipmentType",equipmentTypeSchema)