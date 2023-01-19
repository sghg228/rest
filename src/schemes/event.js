const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const eventScheme = new Scheme({
    date: {type: Date, default: new Date()},
    user_id: Number,
    method: String,
    route: String,
    body: {},
    params: {},
    query: {},
})

module.exports = eventScheme;

