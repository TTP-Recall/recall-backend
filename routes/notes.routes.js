const express = require('express')
const router = express.Router()
const { Note } = require('../models/index')
const { requireAuth } = require('../middleware/auth')

// Get all notes for current user
router.get('/', requireAuth, async (req, res) => {

})

// Get single note by ID
router.get('/:id', async (req, res, next) => {
    try {
        // Find the note by the ID in the URL
        // Make sure it belongs to the logged-in user
        const note = await Note.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        })
        if(!note) {
            res.status(404).json('note doesnt exist')
        }
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
})

// Create new note
router.post('/', requireAuth, async (req, res, next) => {
    const {title, content} = req.body
    try {
        const note = await Note.create({title, content, userId: req.user.id})
        res.status(201).json(note)
    } catch (error) {
        next(error)
    }

    res.status(201).json(note)
})

// Update note
router.patch('/:id', async (req, res) => {

})

// Delete note
router.delete('/:id', async (req, res) => {

})

module.exports = router