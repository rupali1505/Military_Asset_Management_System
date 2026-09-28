const { createTransfer, getAllTransfer } = require("../Controller/transfer.controller");
const authenticateUser = require("../Middleware/authenticateUser");
const checkPermission = require("../Middleware/checkPermission");
const checkBaseAccess = require("../Middleware/checkBaseAccess");
const validate = require("../Middleware/validate");
const transferValidator = require("../Validator/transfer.validator");

const express = require("express");
const router = express.Router();

router.post("/create", authenticateUser, checkPermission("transfer", "create"), checkBaseAccess, validate(transferValidator) ,createTransfer);

router.get("/getAllTransfer", authenticateUser, checkPermission("transfer", "view"),  getAllTransfer);

module.exports = router;