const {register,logIn} = require("../Controller/userAuth.controller");
const validate = require("../Middleware/validate");
const registerValidator = require("../Validator/register.validator");
const loginValidator = require("../Validator/logIn.validator");

const express = require("express");
const router = express.Router();


router.post("/register", validate(registerValidator), register);
router.post("/login", validate(loginValidator), logIn)
module.exports = router