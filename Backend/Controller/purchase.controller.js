const {createPurchaseService, getAllPurchaseService} = require("../Services/purchase.service");
const {createTransactionLogService} = require("../Services/transaction.service");

const createPurchase = async (req,res)=>{

const {baseId,equipmentTypeId,quantity,purchaseDate} = req.body;

const createdBy = req.user._id
try {
    const response = await createPurchaseService({ baseId, equipmentTypeId, quantity, purchaseDate,createdBy });

    await createTransactionLogService({
        userId: createdBy,
        action: "CREATE",
        module: "purchase",
        details: `Purchase created with quantity ${quantity}`
    });

    res.status(200).json({
        status:true,
        msg:"purchase created Successfully",
        data:response
    })
} catch (error) {
    res.status(500).json({
        status:false,
        msg:error.message
    })
}

}

const getAllPurchase = async (req, res) => {

    try {

        const baseId = req.query.baseId;

        const response = await getAllPurchaseService({
            baseId
        });

        res.status(200).json({
            status: true,
            data: response
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            error: error.message
        });
    }
};

module.exports = {
    createPurchase,
    getAllPurchase
}