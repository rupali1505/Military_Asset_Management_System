const baseModel = require("../Model/baseModel")

class baseService{
    getAllBaseService = async()=>{
   const response = await baseModel.find();
   return response
    }
}

module.exports = new baseService()