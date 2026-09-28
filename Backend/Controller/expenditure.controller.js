const {createExpenditureService,getAllExpenditureService} = require("../Services/expenditure.service");
const { createTransactionLogService } = require("../Services/transaction.service");

const createExpenditure = async (req, res) => {
 const {
        baseId,
        equipmentTypeId,
        quantity,
        expenditureDate,
        reason
    } = req.body;

    const createdBy = req.user._id;

    try {

        const response = await createExpenditureService({
            baseId,
            equipmentTypeId,
            quantity,
            expenditureDate,
            reason,
            createdBy
        });

        await createTransactionLogService({
            userId: createdBy,
            action: "CREATE",
            module: "expenditure",
            details: `Expenditure created with quantity ${quantity}. Reason: ${reason}`
        });

        res.status(200).json({
            status: true,
            msg: "Expenditure created successfully",
            data: response
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            msg: error.message
        });
    }
};


const getAllExpenditure = async (req, res) => {

    

    try {

        const baseId = req.query.baseId;

        const response = await getAllExpenditureService({
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
    createExpenditure,
    getAllExpenditure
};