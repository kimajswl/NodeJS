
const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";

const config = require("../config/config.json")[env];

const mysqlDB = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

mysqlDB.users = require("./User.js")(sequelize, DataTypes);

module.exports = mysqlDB;


