const mongoose = require("mongoose");
const eventScheme = require("../schemes/event");

const Event = mongoose.model("event", eventScheme);

module.exports = Event;

