const {getAllBase} = require("../Controller/base.controller")
const express = require("express");
const router = express.Router();


router.get("/getAllBase",getAllBase);


module.exports = router