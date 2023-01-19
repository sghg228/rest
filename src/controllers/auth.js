const authService = require('../services/auth');
const passport = require("passport");
const Response = require("../utils/response");
const JWTUtil = require("../utils/jwt");

class AuthController {
    async signup(req, res, next) {
        const userData = req.body;
        try {
            const user = await authService.signup(userData);
            req.session.user = user;
            const token = JWTUtil.issueJWT(user);
            res.status(201).json({
                user: user,
                token: token.token,
                expiresIn: token.expires
            });
        } catch (err) {
            return next(err);
        }
    }

    async login(req, res, next) {
        const loginData = req.body;
        try {
            const user = await authService.login(loginData.login, loginData.password);
            req.session.user = user;
            const token = JWTUtil.issueJWT(user);
            res.status(201).json({
                user: user,
                token: token.token,
                expiresIn: token.expires
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new AuthController();

