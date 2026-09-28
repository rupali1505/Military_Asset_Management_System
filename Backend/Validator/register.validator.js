const Joi = require("joi");

const registerValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    roleName: Joi.string()
        .valid(
            "admin",
            "logistics_officer",
            "base_commander"
        )
        .required(),

    baseName: Joi.string()
        .allow("")
        .allow(null)
});

module.exports = registerValidator;