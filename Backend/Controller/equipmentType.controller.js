const { getAllEqupmentTypeService } = require("../Services/equipmentType.service")

getAllEquipmentType = async(req,res)=>{
try {
    const response = await getAllEqupmentTypeService();
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
    getAllEquipmentType
}