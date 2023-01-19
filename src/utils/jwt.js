const jsonwebtoken = require('jsonwebtoken');
const constants = require("../constants");

class JWTUtil {
    issueJWT(user) {
        const expiresIn = constants.jwtExpiresIn;
        const payload = {
            sub: user.id,
            role: user.role,
            user: user,
            iat: Date.now(),
            exp: Date.now() + constants.jwtExpiresIn
        };

        const signedToken = jsonwebtoken.sign(payload, constants.secret);
        return {
            token: signedToken,
            expires: expiresIn
        };
    }
}

module.exports = new JWTUtil();


