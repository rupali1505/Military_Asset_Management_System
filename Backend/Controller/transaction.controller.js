const {getAllTransactionLogService} = require("../Services/transaction.service");

const getAllTransactionLog = async (req, res) => {

    try {

        const response = await getAllTransactionLogService();

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
    getAllTransactionLog
};