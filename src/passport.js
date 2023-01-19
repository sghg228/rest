const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UnauthorizedError = require("./errors/UnauthorizedError");

const constanrs = require("./constants");
const authService = require("./services/auth");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constanrs.secret // TODO: make it more security by change public key
};

const strategy = new JwtStrategy(options, async (payload, done) => {
    try {
        if (payload.exp <= Date.now()) {
            return done(new UnauthorizedError("jwt token expired"), false);
        }
        const id = payload.sub;
        const user = await authService.findActiveUserById(id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
});

module.exports = (passport) => {
    passport.use(strategy);
}

