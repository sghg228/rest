const mongoLogger = require("../utils/mongoLogger");

module.exports = async (req, res, next) => {
    try {
        const eventData = {
            route: req._parsedOriginalUrl.path,
            userId: req.session.user ? req.session.user.id : null,
            method: req.method,
            body: req.body || null,
            params: req.params || null,
            query: req.query || null
        }
        await mongoLogger.event(eventData);
        return next();
    } catch (err) {
        return next(err);
    }
}

