
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
  {
    indexes: [
      { unique: true, fields: ["userId", "name"] }, // unique per-user, not globally
    ],
  }
)

module.exports = Folder