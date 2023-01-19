const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    app: {
        port: parseInt(process.env.APP_PORT, 10) || 2001,
    },

    mongo: {
        host: process.env.MONGO_HOST || '127.0.0.1',
        port: parseInt(process.env.MONGO_PORT, 10) || 27017,
        user: process.env.MONGO_USER || '',
        pass: process.env.MONGO_PASS || '',
        dbName: process.env.MONGO_DB_NAME || 'restaurant_logs',
    }

}
