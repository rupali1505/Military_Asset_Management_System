const Joi = require("joi");

const expenditureValidator = Joi.object({
    baseId: Joi.string()
        .required(),

    equipmentTypeId: Joi.string()
        .required(),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required(),

    expenditureDate: Joi.date()
        .required(),

    reason: Joi.string()
        .required()
});

module.exports = expenditureValidator;