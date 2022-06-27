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
    const userLogged = await Users.find({_id: userId});
    const user = userLogged[0];
    try {
        const new_note = new Notes({ userId, title, content, priority });
        await new_note.save();
        //console.log(new_note);
        user.notes.push(new_note)
        await user.save()
        res.send({message:'Sale Created.'})
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//EDIT SALE:
const editNote = async (req, res) => {
    const { id, userId, productId, amount } = req.body
    if (!validator.isMongoId(id) || !validator.isMongoId(userId) || !validator.isMongoId(productId)) {
        res.status(400).send({message:'Invalid Params.'})
        return
    }
    try {
        //DELETE OLD NOTE:
            const note = await Notes.findById(id);
            
            const user = await Users.findById(sale.userId);
            for (let i = 0; i < user.notes.length; i++) {
                if (user.notes[i]._id == id) {
                    user.notes.splice(i, 1);
                    break;
                }
            }
            await user.save();
            await Notes.findByIdAndDelete(id);
        //CREATE NEW SALE:
            const new_note = new Notes({ productId, userId, amount, price : product.price * amount })
            await new_note.save()
            user.notes.push(new_note)
            await user.save()
            res.send({message:'Sale Updated.'})
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
        const user = await Users.findById(note.userId);
        for (let i = 0; i < user.notes.length; i++) {
            if (user.notes[i]._id == id) {
                user.notes.splice(i, 1);
                break;
            }
        }
        await user.save();
        await Notes.findByIdAndDelete(id);
        if (note) {
            res.send({message:'Sale Deleted.'})
        } else {
            res.status(400).send({message:'The sale does not exist.'})
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