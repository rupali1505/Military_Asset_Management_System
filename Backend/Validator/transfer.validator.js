const Joi = require("joi");

const transferValidator = Joi.object({
    fromBaseId: Joi.string()
        .required(),

    toBaseId: Joi.string()
        .required(),

    equipmentTypeId: Joi.string()
        .required(),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required(),

    transferDate: Joi.date()
        .required()
});

module.exports = transferValidator;