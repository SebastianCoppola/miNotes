const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { sendEmail } = require('../helpers/mailer');
const { response } = require('express');
require('dotenv').config();


const app = express.Router() 


app.post("/", async (req,res) => {
    
    const {mail,password} = req.body;
    
    try{
        const user = await User.find({mail})
        if(user.length === 0){
            res.status(404).send({message:'User does not exist.'})
            return;
        }
        const storedPassword = user[0].password;
        bcrypt.compare(password, storedPassword,(err,resCompare)=>{
            if(err){
                res.status(500).send({message:'Server Error.'})
                return;
            }
            if(!resCompare){
                res.status(401).send({message:'Invalid Password. ', mail: mail})
                return;
            }
            const token = jwt.sign({mail}, process.env.privateKey);
            res.cookie('token', token, {maxAge: 60 * 60 * 1000})
            user[0].logged = true;
            user[0].save();
            res.status(200).send({token, message: 'User logged in.'})
        })
    }catch(e){
        res.status(500).send({message:'Server Error.'})
    }
})



app.post("/resetPassword", async (req,res) => {
    //MAIL & NEWPASS:
    const mail = req.body.mail;
    const newPass = Math.random().toString(36).slice(-8);
    console.log(newPass);

    //SAVE NEW PASS:
    try{
        const user = await User.find({mail})
        bcrypt.hash(newPass, 10, async (err, hash) => {
            if(err){
                res.status(500).send({message:'Server Error.'})
                return;
            }
            user[0].password = hash;
            user[0].save();
        })   
    }catch(e){
        res.status(500).send({message:'Server Error.'})
    }

    //SEND EMAIL WITH NEW PASS:
    try{
        const newEmail = sendEmail(mail,newPass);
        res.status(200).send({message:'Email sent.'});
    }catch(e){
        res.status(400).send({message:'Error sending email.'})
    };   
});

module.exports = app;