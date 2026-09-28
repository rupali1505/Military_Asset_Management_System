const {createExpenditure,getAllExpenditure} = require("../Controller/expenditure.controller");
const checkBaseAccess = require("../Middleware/checkBaseAccess");

const authenticateUser = require("../Middleware/authenticateUser");
const checkPermission = require("../Middleware/checkPermission");
const validate = require("../Middleware/validate");
const expenditureValidator = require("../Validator/expenditure.validator");

const express = require("express");
const router = express.Router();

router.post(
    "/create",
    authenticateUser,
    checkPermission("expenditure", "create"),
    checkBaseAccess,
    validate(expenditureValidator),
    createExpenditure
);

router.get(
    "/getAllExpenditure",
    authenticateUser,
    checkPermission("expenditure", "view"),
    checkBaseAccess,
    getAllExpenditure
);

module.exports = router;