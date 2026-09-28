const {getAllTransactionLog} = require("../Controller/transaction.controller");
const authenticateUser = require("../Middleware/authenticateUser");

const express = require("express");
const router = express.Router();

router.get(
    "/getAllLogs",
    authenticateUser,
    getAllTransactionLog
);

module.exports = router;