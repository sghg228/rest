const Response = require("../utils/response");

module.exports = (err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json(new Response(err.message, status));
}

