const {createAssignment,getAllAssignment} = require("../Controller/assignment.controller");
const checkBaseAccess = require("../Middleware/checkBaseAccess");

const authenticateUser = require("../Middleware/authenticateUser");
const checkPermission = require("../Middleware/checkPermission");
const validate = require("../Middleware/validate");
const assignmentValidator = require("../Validator/assignment.validator");

const express = require("express");
const router = express.Router();

router.post("/create", authenticateUser, checkPermission("assignment", "create"), checkBaseAccess, validate(assignmentValidator), createAssignment);

router.get( "/getAllAssignment",authenticateUser,checkPermission("assignment", "view"),getAllAssignment);

module.exports = router;