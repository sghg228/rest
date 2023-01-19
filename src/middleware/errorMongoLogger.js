const mongoLogger = require("../utils/mongoLogger");

module.exports = async (err, req, res, next) => {
    try {
        await mongoLogger.error(err);
    } catch (err) {
        console.error(err);
    }
    return next(err);
}

