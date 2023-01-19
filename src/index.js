const express = require('express');
const loader = require('./loader');
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const options = require("./config/swagger");
const db = require('./database');
const port = require('./config').app.port;
const mongoConfig = require('./config').mongo;
const cors = require('cors')


// swagger
const spec = swaggerJsDoc(options);

const app = express();
app.use(cors({origin: '*'}))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
app.use(loader);

async function start() {
    app.listen(port, () => console.log(`Server started at port ${port}`));

    await mongoose.connect(`mongodb://${mongoConfig.host}:${mongoConfig.port}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: mongoConfig.user,
        pass: mongoConfig.pass,
        dbName: mongoConfig.dbName,
    });
}

start();

module.exports = app;


