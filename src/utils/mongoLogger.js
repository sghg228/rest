const Error = require("../repository/error");
const Event = require("../repository/event");
const DbOperations = require("../repository/dbOperations");

class MongoLogger {
    async error(err) {
        const error = new Error({
            date: new Date(),
            message: err.message,
            code: err.status || 500,
            route: err.route,
        });
        await error.save();
    }

    async event(data) {
        const event = new Event({
            date: new Date(),
            user_id: data.userId,
            method: data.method,
            route: data.route,
            body: data.body ,
            params: data.params ,
            query: data.query ,
        });
        await event.save();
    }

    async dbOperations(query, data) {
        const dbOperations = new DbOperations({
            date: new Date(),
            type: data.type,
            model: data.model && data.model.name,
            query: query.replaceAll('"', '\''),
        });
        await dbOperations.save();
    }
}

module.exports = new MongoLogger();

