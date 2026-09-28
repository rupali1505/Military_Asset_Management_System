const purchaseModel = require("../Model/purchaseModel")

class purchaseService{
    createPurchaseService = async({ baseId, equipmentTypeId, quantity, purchaseDate,createdBy })=>{
        const purchaseData = new purchaseModel({ baseId, equipmentTypeId, quantity, purchaseDate, createdBy }) ;
        const response = await purchaseData.save();
        return response
    }

    getAllPurchaseService = async ({ baseId }) => {

        let purchaseData;

        if (baseId) {
            purchaseData = await purchaseModel.find({
                baseId: baseId
            });
        } else {
            purchaseData = await purchaseModel.find();
        }

        return purchaseData;
    }
}

module.exports = new purchaseService()