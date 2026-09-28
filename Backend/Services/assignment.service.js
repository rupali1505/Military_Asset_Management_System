const assignmentModel = require("../Model/assignmentModel");

class assignmentService {

    createAssignmentService = async ({ baseId,equipmentTypeId,personnelName,quantity,assignmentDate,createdBy}) => {

        const assignmentData = new assignmentModel({
            baseId,
            equipmentTypeId,
            personnelName,
            quantity,
            assignmentDate,
            createdBy
        });

        const response = await assignmentData.save();

        return response;
    };

    getAllAssignmentService = async ({ baseId }) => {

        const assignmentData = await assignmentModel.find({
            baseId: baseId
        });

        return assignmentData;
    };
}

module.exports = new assignmentService();