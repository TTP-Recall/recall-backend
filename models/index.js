// models/index.js — one place to collect all models and their relationships.
// Lets the rest of the app grab them from here: const { Task } = require('./models')

const db = require('../db');
const Task = require('./task.model');
const User = require('./user.model');
const Note = require('./note.model')
const Folder = require('./folder.model')


Folder.belongsTo(User);
User.hasMany(Folder);

User.hasMany(Note, {foreignKey: 'userId'})
Note.belongsTo(User, {foreignKey: 'userId'})

Folder.hasMany(Note, {foreignKey: 'folderId'})
Note.belongsTo(Folder, {foreignKey: 'folderId'})

module.exports = {
  db, // exported too so seed.js can sync from one place
  Task,
  User,
  Note,
  Folder,
};
