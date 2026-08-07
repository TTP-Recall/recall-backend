// models/index.js — one place to collect all models and their relationships.
// Lets the rest of the app grab them from here: const { Task } = require('./models')

const db = require('../db');
const Task = require('./task.model');
const User = require('./user.model');
const Note = require('./note.model')

// ---------- associations ----------
// Describe how tables relate here. When you're ready to tie tasks to their
// owner, uncomment these (it adds a userId column to tasks):
//   User.hasMany(Task)     // one user has many tasks
//   Task.belongsTo(User)   // each task belongs to one user (adds a userId column)



User.hasMany(Note, {foreignKey: 'userId'})
Note.belongsTo(User, {foreignKey: 'userId'})

module.exports = {
  db, // exported too so seed.js can sync from one place
  Task,
  User,
  Note
};
