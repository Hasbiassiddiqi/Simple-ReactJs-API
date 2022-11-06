const { Sequelize } = require("sequelize");

const seq = new Sequelize("absensi", "root", "", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = seq;
