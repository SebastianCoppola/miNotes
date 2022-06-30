const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: String,
    title: String,
    content: String,
    priority: String
},{
    timestamps: true
})

const NoteModel = mongoose.model('Notes',NoteSchema)

module.exports = NoteModel