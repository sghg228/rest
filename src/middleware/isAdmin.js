const constants = require("../constants");
const ForbiddenError = require("../errors/ForbiddenError");

module.exports = (req, res, next) => {
    if (req.session.user.role == constants.adminRoleNum) {
        return next();
    } else {
        return next(new ForbiddenError("Not enough rights"));
    }
};

