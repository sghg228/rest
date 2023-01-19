const passport = require("passport");
const UnauthorizedError = require("../errors/UnauthorizedError");
const jsonwebtoken = require('jsonwebtoken');


module.exports = (req, res, next) => {
    passport.authenticate("jwt", {session: true}, (err, user, info) => {
        if (user) {
            req.session.user = user;
            return next();
        }
        if (err) {
            return next(err);
        }
        return next(new UnauthorizedError("unauthorized"));
    })(req, res, next);

}

