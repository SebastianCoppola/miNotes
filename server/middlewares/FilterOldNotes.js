const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Notes = require('../models/NoteModel');

const getUserNotes = async (req,res) => {    
        const userNotes = await Notes.find({userId: req})
        return userNotes;
}
const deleteNote = async (req,res) => {    
    await Notes.findByIdAndDelete(req);
    return;
}

const filterOldNotes = async (req, res, next) =>{
    const userId = req.params.id;
    const userNotes = await getUserNotes(userId);

    userNotes.forEach(note => {
        if (note.priority === 'today' && (note.createdAt - new Date() ) <= -86400000) {
            const noteId = note._id;
            deleteNote(noteId);
            console.log("Note deleted: ");
        }
    });
    next();
}

module.exports = filterOldNotes;