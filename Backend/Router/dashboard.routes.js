const {getDashboard} = require("../Controller/dashboard.controller");
const authenticateUser = require("../Middleware/authenticateUser");

const express = require("express");
const router = express.Router();

router.get(
    "/",
    authenticateUser,
    getDashboard
);

module.exports = router;