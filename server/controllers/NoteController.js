const Notes = require('../models/NoteModel');
const Users = require('../models/UserModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

//GET ALL NOTES:
const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find()
        res.send(notes)
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//GET USER NOTES:
const getNotes = async (req, res) => {    
    try {
        const notes = await Notes.find({userId: req.params.id})
        res.send(notes)
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//CREATE NOTE:
const createNote = async (req, res) => {
    const { userId, title, content, priority } = req.body
    if ( !validator.isMongoId(userId)) {
        res.status(400).send({message:'InvalidParams.'})
        return
    }
    try {
        const new_note = new Notes({ userId, title, content, priority });
        await new_note.save();
        res.send({message:'Note Created.'})
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//NEW EDIT NOTE: 
const editNote = async (req, res) => {
    const { id, title, content, priority } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send({message:'Invalid Params.'})
        return
    }
    try {
            const note = await Notes.findById(id);
            note.title = title;
            note.content = content;
            note.priority = priority;
            await note.save();
            res.send({message:'Note Updated.'})
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//DELETE NOTE:
const deleteNote = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send({message:'Invalid Params.'})
        return
    }
    try {
        const note = await Notes.findById(id);
        await Notes.findByIdAndDelete(id);
        if (note) {
            res.send({message:'Note Deleted.'})
        } else {
            res.status(400).send({message:'The note does not exist.'})
        }
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

module.exports = {
    getAllNotes,
    getNotes,
    createNote,
    editNote,
    deleteNote
}