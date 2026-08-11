
const { DataTypes } = require("sequelize");
const db = require("../db");

const Folder = db.define(
  "Folders",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
  },

)

module.exports = Folder