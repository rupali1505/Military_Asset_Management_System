const {createAssignmentService, getAllAssignmentService} = require("../Services/assignment.service");
const {createTransactionLogService} = require("../Services/transaction.service");

const createAssignment = async (req, res) => {

    const { baseId, equipmentTypeId, personnelName,quantity,assignmentDate} = req.body;

    const createdBy = req.user._id;

    try {

        const response = await createAssignmentService({
            baseId,
            equipmentTypeId,
            personnelName,
            quantity,
            assignmentDate,
            createdBy
        });

        await createTransactionLogService({
            userId: createdBy,
            action: "CREATE",
            module: "assignment",
            details: `Assignment created for ${personnelName} with quantity ${quantity}`
        });
        
        res.status(200).json({
            status: true,
            msg: "Assignment created successfully",
            data: response
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            msg: error.message
        });
    }
};


const getAllAssignment = async (req, res) => {

    try {

        const baseId = req.query.baseId;

        const response = await getAllAssignmentService({
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
    createAssignment,
    getAllAssignment
};