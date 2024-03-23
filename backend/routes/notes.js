const express = require('express');
const router = express.Router();

const Notes = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//Route 1: Get all notes
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.user.id });
            res.json(notes);
        } catch (error) {
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    }
);

//Route 2: Add notes
router.post('/addnote', fetchuser,
    body('title').isLength({ min: 1 }),
    body('description').isLength({ min: 1 }),

    async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const note = new Notes({
                title, description, tag, user: req.user.id // req.user.id from middleware fetchuser
            })

            const savedNote = await note.save();
            res.json(savedNote)

        } catch (error) {
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    }
);

module.exports = router;