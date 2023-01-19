const Joi = require("joi").extend(require("@joi/date"));
const SchemeScheme = require("./scheme");

const RestaurantScheme = {
    create: Joi.object().keys({
        name: Joi.string()
            .max(120)
            .required(),
        adres: Joi.string()
            .max(120)
            // .regex(/^([^,^0-9]+, ){3}\d{1,3}$/)
            .required(),
        avatar: Joi.allow(),
        scheme: SchemeScheme.create
            .required(),

    }),

    update: Joi.object().keys({
        name: Joi.string()
            .max(120),
        avatar: Joi.allow(),
        adres: Joi.string()
            .max(120)
            // .regex(/^([^,^0-9]+, ){3}\d{1,3}$/),

    })
}

module.exports = RestaurantScheme;


