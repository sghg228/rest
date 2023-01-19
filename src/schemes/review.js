const Joi = require("joi").extend(require("@joi/date"));

const ReviewScheme = {
    create: Joi.object().keys({
        rate: Joi.number()
            .integer()
            .min(1)
            .max(10)
            .required(),
        review: Joi.string().allow(null, ''),
        restaurant_id: Joi.number()
            .integer()
            .min(1)
            .required()
    }),
    update: Joi.object().keys({
        rate: Joi.number()
            .integer()
            .min(1)
            .max(10)
            .required(),
            review: Joi.string().allow(null, ''),
    })
}

module.exports = ReviewScheme;


