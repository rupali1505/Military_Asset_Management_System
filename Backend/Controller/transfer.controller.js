const { createTransferService, getAllTransferService } = require("../Services/transfer.service");
const {createTransactionLogService} = require("../Services/transaction.service");


const createTransfer = async (req, res) => {
    const {
        fromBaseId,
        toBaseId,
        equipmentTypeId,
        quantity,
        transferDate
    } = req.body;

    const createdBy = req.user._id;

    try {

        const response = await createTransferService({ fromBaseId, toBaseId, equipmentTypeId, quantity, transferDate, createdBy });
        
        await createTransactionLogService({
            userId: createdBy,
            action: "CREATE",
            module: "transfer",
            details: `Transfer created with quantity ${quantity}`
        });
        
        res.status(200).json({
            status: true,
            msg: "Transfer created successfully",
            data: response
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            msg: error.message
        });
    }
};


const getAllTransfer = async (req, res) => {

    try {

        const baseId = req.query.baseId;

        const response = await getAllTransferService({
            baseId
        });

        res.status(200).json({
            status: true,
            data: response
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            msg: error.message
        });
    }
};


module.exports = {
    createTransfer,
    getAllTransfer
};