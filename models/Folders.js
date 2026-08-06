const { DataTypes } = require("sequelize");
const db = require("../db");


const Folder = db.define("Folders", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
})

module.exports = Folder