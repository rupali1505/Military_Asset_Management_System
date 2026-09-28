const purchaseModel = require("../Model/purchaseModel");
const transferModel = require("../Model/transferModel");
const assignmentModel = require("../Model/assignmentModel");
const expenditureModel = require("../Model/expenditureModel");

class dashboardService {

    getDashboardService = async ({
        baseId,
        equipmentTypeId,
        startDate,
        endDate
    }) => {

        // -------------------------
        // Purchase Filter
        // -------------------------

        const purchaseFilter = {};

        if (baseId) {
            purchaseFilter.baseId = baseId;
        }

        if (equipmentTypeId) {
            purchaseFilter.equipmentTypeId = equipmentTypeId;
        }

        if (startDate || endDate) {

            purchaseFilter.purchaseDate = {};

            if (startDate) {
                purchaseFilter.purchaseDate.$gte = new Date(startDate);
            }

            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);

                purchaseFilter.purchaseDate.$lte = end;
            }
        }

        const purchases = await purchaseModel.find(purchaseFilter);

        const totalPurchases = purchases.reduce(
            (total, item) => total + item.quantity,
            0
        );


        // -------------------------
        // Expenditure Filter
        // -------------------------

        const expenditureFilter = {};

        if (baseId) {
            expenditureFilter.baseId = baseId;
        }

        if (equipmentTypeId) {
            expenditureFilter.equipmentTypeId = equipmentTypeId;
        }

        if (startDate || endDate) {

            expenditureFilter.expenditureDate = {};

            if (startDate) {
                expenditureFilter.expenditureDate.$gte =
                    new Date(startDate);
            }

            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);

                expenditureFilter.expenditureDate.$lte = end;
            }
        }

        const expenditures = await expenditureModel.find(
            expenditureFilter
        );

        const totalExpended = expenditures.reduce(
            (total, item) => total + item.quantity,
            0
        );


        // -------------------------
        // Assignment Filter
        // -------------------------

        const assignmentFilter = {};

        if (baseId) {
            assignmentFilter.baseId = baseId;
        }

        if (equipmentTypeId) {
            assignmentFilter.equipmentTypeId = equipmentTypeId;
        }

        if (startDate || endDate) {

            assignmentFilter.assignmentDate = {};

            if (startDate) {
                assignmentFilter.assignmentDate.$gte =
                    new Date(startDate);
            }

            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);

                assignmentFilter.assignmentDate.$lte = end;
            }
        }

        const assignments = await assignmentModel.find(
            assignmentFilter
        );

        const totalAssigned = assignments.reduce(
            (total, item) => total + item.quantity,
            0
        );


        // -------------------------
        // Transfer Filter
        // -------------------------

        const transferFilter = {};

        if (equipmentTypeId) {
            transferFilter.equipmentTypeId = equipmentTypeId;
        }

        if (startDate || endDate) {

            transferFilter.transferDate = {};

            if (startDate) {
                transferFilter.transferDate.$gte =
                    new Date(startDate);
            }

            if (endDate) {
                transferFilter.transferDate.$lte =
                    new Date(endDate);
            }
        }

        const transfers = await transferModel.find(
            transferFilter
        );


        // -------------------------
        // Transfer In / Out
        // -------------------------

        let transferIn = 0;
        let transferOut = 0;

        transfers.forEach((item) => {

            // If a base is selected
            if (baseId) {

                if (
                    item.toBaseId.toString() === baseId.toString()
                ) {
                    transferIn += item.quantity;
                }

                if (
                    item.fromBaseId.toString() === baseId.toString()
                ) {
                    transferOut += item.quantity;
                }

            } else {

                // All-base dashboard
                transferIn += item.quantity;
                transferOut += item.quantity;

            }

        });


        // -------------------------
        // Dashboard Calculations
        // -------------------------

        const openingBalance = 0;

        const netMovement =
            totalPurchases +
            transferIn -
            transferOut;

        const closingBalance =
            openingBalance +
            netMovement -
            totalAssigned -
            totalExpended;


        // -------------------------
        // Return Result
        // -------------------------

        return {
            openingBalance,
            purchases: totalPurchases,
            transferIn,
            transferOut,
            netMovement,
            assigned: totalAssigned,
            expended: totalExpended,
            closingBalance
        };
    };
}

module.exports = new dashboardService();