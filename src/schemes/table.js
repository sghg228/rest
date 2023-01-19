const Joi = require("joi").extend(require("@joi/date"));

const TableScheme = {
    create: Joi.object().keys({
        capacity: Joi.number()
            .integer()
            .min(1)
            .required(),
        width: Joi.number()
            .positive(),
        height: Joi.number()
            .positive(),
        x: Joi.number()
            .positive(),
        y: Joi.number()
            .positive(),
    })
}

module.exports = TableScheme;

