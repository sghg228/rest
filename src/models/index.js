const User = require('./user');
const UserInfo = require("./userinfo");
const Restaurant = require("./restaurant");
const Scheme = require("./scheme");
const Table = require("./table");
const TableReservation = require("./tableReservation");
const Review = require("./review");

// users:
User.hasMany(Restaurant, {foreignKey: "user_id"});
User.hasOne(UserInfo, {foreignKey: "user_id"});

// user info:
UserInfo.belongsTo(User, {foreignKey: "user_id", onDelete: "CASCADE"});

// restaurants:
Restaurant.hasOne(Scheme, {foreignKey: "restaurant_id"})

// schemes
Scheme.belongsTo(Restaurant, {foreignKey: "restaurant_id"});
Scheme.hasMany(Table, {foreignKey: "scheme_id"});

// tables:
Table.belongsTo(Scheme, {foreignKey: "scheme_id"});

// reservations:
TableReservation.belongsTo(User, {foreignKey: "user_id"});
TableReservation.belongsTo(Table, {foreignKey: "table_id"});

// reviews:
Review.belongsTo(User, {foreignKey: "user_id"});
Review.belongsTo(Restaurant, {foreignKey: "restaurant_id"});

