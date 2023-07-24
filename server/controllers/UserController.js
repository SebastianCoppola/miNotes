const User = require('../models/UserModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


//GET ALL USERS:
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//GET USER:
const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.find({_id: id})
        await res.send(user)
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

//SIGN UP:
const signUp = async (req, res) => {
    try{
        console.log(req.body)
        const { name, surname, mail, password } = req.body
        if (!validator.matches(name,/^[a-zA-Z ]*$/) || !validator.matches(surname,/^[a-zA-Z ]*$/) || !validator.isEmail(mail)) {
            res.status(400).send({message:'InvalidParams.'})
            return;
        }
        const registeredUser = await User.findOne({mail})
        if (registeredUser) {
            res.status(409).send({message:'This mail has already been registered.'})
            return;
        }
        bcrypt.hash(password, 10, async (err, hash) =>{
            if(err){
                res.status(500).send({message:'Server Error.'})
            }
            const new_user = new User({name, surname, mail, password : hash, logged : false})
            new_user.save()
            console.log(new_user);
            res.status(200).send({userId: new_user._id, message:"User Saved."})
        })
    }catch(err){
        console.log(err);
        res.status(500).send({message:'Server Error.'})    
    }
}

//EDIT A USER:
const editUser = async (req, res) => {
    const { id, name, surname, mail, password } = req.body
    if (!validator.isMongoId(id) || !validator.matches(name,/^[a-zA-Z ]*$/) || !validator.matches(surname,/^[a-zA-Z ]*$/) || !validator.isEmail(mail)) {
        res.status(400).send({message:'InvalidParams.'})
        return;
    }
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            if(err){
                res.status(500).send({message:'Server Error.'})
            }
            const user = await User.findById(id)
            await user.updateOne({ $set: { name, surname, mail, password : hash} })
            res.send("User Updated.")
        })   
    }catch(e){
        res.status(500).send({message:'Server Error.'})
    }
}

//DELETE A USER:
const deleteUser = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send({message:'InvalidParams.'})
        return;
    }
    try {
        const encontrado = await User.findByIdAndDelete(id)
        if (encontrado) {
            res.clearCookie('token');
            res.send({message:'User Deleted.'})
        } else {
            res.status(400).send({message:'User does not exist.'})
        }
    } catch (e) {
        res.status(500).send({message:'Server Error.'})
    }
}

module.exports = {
    getAllUsers,
    getUser,
    signUp,
    editUser,
    deleteUser
}