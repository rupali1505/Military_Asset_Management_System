const Joi = require("joi");

const assignmentValidator = Joi.object({
    baseId: Joi.string()
        .required(),

    equipmentTypeId: Joi.string()
        .required(),

    personnelName: Joi.string()
        .required(),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required(),

    assignmentDate: Joi.date()
        .required()
});

module.exports = assignmentValidator;