const express = require('express')
const router = express.Router()
const { Folder } = require("../models")
console.log('📁 folders.js loaded');
// Get all folderss
router.get('/', async (req, res) => {

})

// Get single folder
router.get('/:id', async (req, res) => {

})

// Create folder
router.post('/', async (req, res) => {
    try {
        const {name} = req.body
        const folder = await Folder.create({
            name,
            UserId: req.user.id
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

// Delete folder
router.delete('/:id', async (req, res) => {

})

module.exports = router