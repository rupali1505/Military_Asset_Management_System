const expenditureModel = require("../Model/expenditureModel");

class expenditureService {

    createExpenditureService = async ({
        baseId,
        equipmentTypeId,
        quantity,
        expenditureDate,
        reason,
        createdBy
    }) => {

        const expenditureData = new expenditureModel({
            baseId,
            equipmentTypeId,
            quantity,
            expenditureDate,
            reason,
            createdBy
        });

        const response = await expenditureData.save();

        return response;
    };

    getAllExpenditureService = async ({ baseId }) => {

        const expenditureData = await expenditureModel.find({
            baseId: baseId
        });

        return expenditureData;
    };
}

module.exports = new expenditureService();