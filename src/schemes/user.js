const Joi = require("joi");
const UserInfoScheme = require("./userinfo");


const UserScheme = {
    signup: Joi.object().keys({
        login: Joi.string()
            .max(50)
            .required(),
        user_info: Joi.object(UserInfoScheme.signup)
            .required(),

        password: Joi.string()
            .min(4)
            .max(20)
            .required()
    }),
    create: Joi.object().keys({
        login: Joi.string()
            .max(50)
            .required(),
        password: Joi.string()
            .min(4)
            .max(20)
            .required()
    }),

    login: Joi.object().keys({
        login: Joi.string()
            .max(50)
            .required(),
        password: Joi.string()
            .min(4)
            .max(20)
            .required()
    }),

    changePassword: Joi.object().keys({
        oldPassword: Joi.string()
            .min(4)
            .max(20)
            .required(),
        newPassword: Joi.string()
            .min(4)
            .max(20)
            .required()
    })
}

module.exports = UserScheme;

