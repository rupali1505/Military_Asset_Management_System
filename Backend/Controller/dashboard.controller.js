const {getDashboardService} = require("../Services/dashboard.service");


const getDashboard = async (req, res) => {

    let {
        baseId,
        equipmentTypeId,
        startDate,
        endDate
    } = req.query;

    try {

        // Admin can select any base
        // Other users can only access their assigned base
        if (req.user.baseId !== null) {
            baseId = req.user.baseId;
        }

        const response = await getDashboardService({
            baseId,
            equipmentTypeId,
            startDate,
            endDate
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
    getDashboard
};