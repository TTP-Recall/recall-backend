const express = require('express')
const router = express.Router()
const { Note, Folder } = require('../models/index')
const { requireAuth } = require('../middleware/auth')

// Get all notes for current user
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const notes = await Note.findAll({
            where: {
                userId: req.user.id
            }
        })
        if(!notes) {
            return res.status(404).json('No notes found')
        }
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
})

// Get single note by ID
router.get('/:id', requireAuth, async (req, res, next) => {
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
            return res.status(404).json('note doesnt exist')
        }
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
})

// Create new note
router.post('/', requireAuth, async (req, res, next) => {
    const { title, content } = req.body
    try {
        const note = await Note.create({title, content, userId: req.user.id})
        res.status(201).json(note)
    } catch (error) {
        next(error)
    }
})

// Update note
router.patch('/:id', requireAuth, async (req, res, next) => {
    try {
        const note = await Note.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        })
        if(!note) {
            return res.status(404).json('note doesnt exist')
        }
        console.log(note)

        note.content = req.body.content
        await note.save()

        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
})

// Delete note
router.delete('/:id', requireAuth, async (req, res, next) => {
    const { id } = req.params
    try {
        const note = await Note.findOne({
            where: {
                id: id,
                userId: req.user.id
            }
        })
        if(!note) {
            return res.status(404).json('note doesnt exist')
        }
        // if we find a note belong to a logged user we can delete
        await note.destroy()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

router.patch('/:id/folder', requireAuth, async (req, res, next) => {
    const noteId = Number(req.params.id)
    const folderId = Number(req.body.folderId)

    try {
        const folder = await Folder.findOne({
            where: {
                id: folderId,
                userId: req.user.id
            }
        })
        if(!folder) {
            return res.status(404).json('folder doesnt exist')
        }
        const note = await Note.findOne({
            where: {
                id: noteId,
                userId: req.user.id
            }
        })
        if(!note) {
            return res.status(404).json('note doesnt exist')
        }

        note.folderId = folder.id
        await note.save()
        
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
})

module.exports = router