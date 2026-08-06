const { DataTypes } = require("sequelize");
const db = require("../db");


const Folders = db.define("Folders", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
})

module.exports = Folders