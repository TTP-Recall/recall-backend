const {DataTypes} = require('sequelize')
const db = require('../db/index')

const Note = db.define('notes', {
    title: {
        type:DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isFavorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull:false
    }
})

module.exports = Note