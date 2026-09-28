const { getAllBaseService } = require("../Services/base.service")
const getAllBase = async(req,res)=>{
    try {
       const response = await getAllBaseService();
       res.status(200).json({
        status:true,
        data:response
       })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

module.exports = {
    getAllBase
}