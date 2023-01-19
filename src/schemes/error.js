const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const errorScheme = new Scheme({
    date: { type: Date, default: new Date() },
    message: String,
    code: Number,
    route: String
})

module.exports = errorScheme;

