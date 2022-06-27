const express = require('express');
const { getAllNotes, getNotes, createNote , editNote , deleteNote } = require('../controllers/NoteController');
const Auth = require('../middlewares/Auth');

const app = express.Router() 

app.get("/all",getAllNotes)

app.get("/:id",getNotes)

app.post("/",Auth,createNote)

app.put("/",Auth,editNote)

app.delete("/",Auth,deleteNote)

module.exports = app;