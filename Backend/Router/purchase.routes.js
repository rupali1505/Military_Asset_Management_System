const {createPurchase,getAllPurchase} = require("../Controller/purchase.controller");
const authenticateUser = require("../Middleware/authenticateUser");
const checkPermission = require("../Middleware/checkPermission");
const checkBaseAccess = require("../Middleware/checkBaseAccess");
const validate = require("../Middleware/validate");
const purchaseValidator = require("../Validator/purchase.validator");

const express = require("express");
const router = express.Router()

router.post("/create", authenticateUser, checkPermission("purchase", "create"), checkBaseAccess, validate(purchaseValidator) ,createPurchase);
router.get("/getAllPurchase", authenticateUser, checkPermission("purchase", "view"), getAllPurchase);

module.exports = router