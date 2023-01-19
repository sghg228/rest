const Joi = require("joi").extend(require("@joi/date"));

const UserInfoScheme = {
    update: Joi.object().keys({
        name: Joi.string()
            .max(50)
            .regex(/^[^0-9\s]+ [^0-9\s]+$/).allow(),
        birthday: Joi.date()
            .format('YYYY-MM-DD')
            .utc().allow(),
        phone: Joi.string()
            .regex(/^(\+\d{1,3}\s)?\d{2}[\s.-]\d{3}([\s.-]\d{2}){2}$/).allow(),
        email: Joi.string()
            .email()
            .max(50).allow(),
        avatar: Joi.string()
            .max(255).allow(),
    }),

    signup: {
        email: Joi.string()
            .email()
            .max(50)
            .required(),
    }
}

module.exports = UserInfoScheme;


