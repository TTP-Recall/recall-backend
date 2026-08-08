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


// Create folder
router.post('/', async (req, res) => {
    try {
        const {name} = req.body
        const folder = await Folder.create({
            name,
            userId: req.user.id
        })
        res.status(201).json(folder)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to create folder" })
    }
})

// Update folder name
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

