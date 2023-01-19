const mongoLogger = require("../utils/mongoLogger");

module.exports = {
    postgres: {
      user: 'postgres',
      password: '987656qqq',
      db: 'restaurant_reservations'
    },
    config: {
        dialect: "postgres",
        host: process.env.POSTGRES_SERVICE_HOST || "127.0.0.1",
        define: {timestamps: false},
        logging: mongoLogger.dbOperations,
    }

}
