const mongoose = require("mongoose");
const dbOperationsScheme = require("../schemes/dbOperations");

const DbOperations = mongoose.model("db_operations", dbOperationsScheme);

module.exports = DbOperations;

