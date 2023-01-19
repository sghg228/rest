const UnprocessableEntityError = require("../errors/UnprocessableEntityError");

module.exports = scheme => {
    return (req, res, next) => {
        const error = scheme.validate(req.body).error;

        if (error) {
            next(new UnprocessableEntityError(error.message));
        }

        next();
    }
}

