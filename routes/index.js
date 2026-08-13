// routes/index.js — one place to collect all routers.
// Lets app.js grab them from here: const { taskRouter } = require('./routes')

const taskRouter = require('./task.routes');
const authRouter = require('./auth.routes');
const folderRouter = require('./folder.routes')
const notesRouter = require('./notes.routes')
const promptRouter = require('./ai.routes')

// Add a new resource? Import its router above and add one line here.
module.exports = {
  taskRouter,
  authRouter,
  folderRouter,
  notesRouter,
  promptRouter
};
