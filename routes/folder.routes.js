<<<<<<< Updated upstream


//
=======
const express = require('express')
const { Folder, Note } = require('../models')
const { requireAuth } = require('../middleware/auth')
const router = express.Router()

router.use(requireAuth) // puts req.user on every request 

// GET /api/folders — all folders for the logged-in user
router.get('/', async (req, res, next) => {
  try {
    const folders = await Folder.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    })
    res.json(folders)
  } catch (err) {
    next(err)
  }
})

// GET /api/folders/:id — one folder + allthe notes inside that folder
router.get('/:id', async (req, res, next) => {
  try {
    const folder = await Folder.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [Note],
    })
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' })
    }
    res.json(folder)
  } catch (err) {
    next(err)
  }
})

// Create folder — marlin come thruuu
router.post('/', async (req, res) => {

})

// Update folder name , marlins route
router.patch('/:id', async (req, res) => {

})

// DELETE /api/folders/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const folder = await Folder.findOne({
      where: { id: req.params.id, userId: req.user.id },
    })
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' })
    }
    await folder.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
>>>>>>> Stashed changes
