const transactionLogModel = require("../Model/transactionLogModel");

class transactionLogService {

    createTransactionLogService = async ({
        userId,
        action,
        module,
        details
    }) => {

        const logData = new transactionLogModel({
            userId,
            action,
            module,
            details
        });

        const response = await logData.save();

        return response;
    };

    getAllTransactionLogService = async () => {

        const logs = await transactionLogModel.find();

        return logs;
    };
}

module.exports = new transactionLogService();