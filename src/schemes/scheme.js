const Joi = require("joi").extend(require("@joi/date"));
const TableScheme = require("./table");

const SchemeScheme = {
    create: Joi.object().keys({
        width: Joi.number()
            .positive()
            .required(),
        height: Joi.number()
            .positive()
            .required(),
        tables: Joi.array()
            .items(TableScheme.create)
            .required()
    }),

    update: Joi.object().keys({
        width: Joi.number()
            .positive(),
        height: Joi.number()
            .positive(),
        tables: Joi.array()
            .items(TableScheme.create)
            .required()
    })
}

module.exports = SchemeScheme;

