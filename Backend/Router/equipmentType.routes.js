const { getAllEquipmentType } = require("../Controller/equipmentType.controller")
const express = require("express");
const router = express.Router();


router.get("/getAllEquipmentType", getAllEquipmentType );


module.exports = router