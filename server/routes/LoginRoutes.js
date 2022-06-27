const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// require('dotenv').config(); ?

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
                res.status(401).send({message:'Invalid Params.'})
                return;
            }
            const token = jwt.sign({mail}, process.env.privateKey);
            res.cookie('token', token, {maxAge: 60 * 60 * 1000})
            user[0].logged = true;
            user[0].save();
            res.send({token, message: 'User logged in.'})
        })
    }catch(e){
        res.status(500).send({message:'Server Error.'})
    }

})

module.exports = app;