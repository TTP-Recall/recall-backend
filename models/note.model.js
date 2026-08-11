const {DataTypes} = require('sequelize')
const db = require('../db/index')

const Note = db.define('notes', {
    title: {
        type:DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isFavorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING(75),
        allowNull: true,
        defaultValue: 'No description'
    }
})

module.exports = Note