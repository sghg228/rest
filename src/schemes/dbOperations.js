const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const dbOperationsScheme = new Scheme({
    date: { type: Date, default: new Date() },
    type: String,
    model: String,
    query: String,
})

module.exports = dbOperationsScheme;

