const equipmentTypeModel = require("../Model/equipmentTypeModel")

class equipmentType{
    getAllEqupmentTypeService = async()=>{
     const data = await equipmentTypeModel.find();
     return data
    }
}

module.exports = new equipmentType();