const mongoose = require("mongoose");
const errorScheme = require("../schemes/error");

const Error = mongoose.model("error", errorScheme);

module.exports = Error;

