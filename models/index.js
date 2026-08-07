// models/index.js — one place to collect all models and their relationships.
// Lets the rest of the app grab them from here: const { Task } = require('./models')

const db = require('../db');
const Task = require('./task.model');
const User = require('./user.model');
const Folder = require('./Folders')

Folder.belongsTo(User);
User.hasMany(Folder);

module.exports = {
  db, // exported too so seed.js can sync from one place
  Task,
  User,
  Folder,
};
