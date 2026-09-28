const Joi = require("joi");

const purchaseValidator = Joi.object({
    baseId: Joi.string()
        .required(),

    equipmentTypeId: Joi.string()
        .required(),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required(),

    purchaseDate: Joi.date()
        .required()
});

module.exports = purchaseValidator;