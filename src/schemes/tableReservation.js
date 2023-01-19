const Joi = require("joi").extend(require("@joi/date"));

const TableReservationScheme = {
    create: Joi.object().keys({
        datetime_begin: Joi.date()
            // .format('YYYY-MM-ddTHH:mm:ss')
            .utc()
            .required(),
        datetime_end: Joi.date()
            // .format('YYYY-MM-ddTHH:mm:ss')
            .utc()
            .required(),
        capacity: Joi.number()
            .integer()
            .min(1)
            .max(5000)
            .required(),
        table_id: Joi.number()
            .integer()
            .min(1)
            .required(),
    }),
    changeStatus: Joi.object().keys({
        status: Joi.number()
            .integer()
            .min(1)
            .max(2)
            .required()
    })
}

module.exports = TableReservationScheme;


