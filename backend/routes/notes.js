const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get all notes
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            const notes = await Note.find({ user: req.user.id });
            res.json(notes);
        } catch (error) {
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    }
);

//Route 2: Add a note
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

            const note = new Note({
                title, description, tag, user: req.user.id // req.user.id from middleware fetchuser
            })

            const savedNote = await note.save();
            res.json(savedNote)

        } catch (error) {
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    }
);

//Route 3: Update note
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try{
            const { title, description, tag } = req.body;
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found"); }

            if (note.user.toString() !== req.user.id) { // security check for one user accessing anothers account.
                return res.status(401).send("Access not allowed");
            }

            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); // set requries object and new: true returns the updated note
            res.json({ note });

        }catch(error){
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    }

);

//Route 4: Delete note

router.put('/deletenote/:id', fetchuser,
    async (req, res) => {
        try{
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found"); }

            if (note.user.toString() !== req.user.id) { // security check for one user accessing anothers account.
                return res.status(401).send("Access not allowed");
            }
            
            note = await Note.findByIdAndDelete(req.params.id); // set requries object and new: true returns the updated note
            res.send("success");

        }catch(error){
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    }
);

module.exports = router;