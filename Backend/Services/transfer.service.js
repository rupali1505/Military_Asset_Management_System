const transferModel = require("../Model/transferModel");

class transferService {

    createTransferService = async ({ fromBaseId, toBaseId, equipmentTypeId, quantity, transferDate, createdBy }) => {
        const transferData = new transferModel({ fromBaseId, toBaseId, equipmentTypeId, quantity, transferDate, createdBy });
        const response = await transferData.save();

        return response;
    };

    getAllTransferService = async ({ baseId }) => {

        const transferData = await transferModel.find({
            $or: [
                { fromBaseId: baseId },
                { toBaseId: baseId }
            ]
        });

        return transferData;
    };
}

module.exports = new transferService();