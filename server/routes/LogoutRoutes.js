const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
//require('dotenv').config(); ?

const app = express.Router() 

app.post("/", async (req,res) => {
    
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token, process.env.privateKey);
    const userLogged = await User.find({mail: tokenDecoded.mail});
    const user = userLogged[0];
    
    user.logged = false;
    user.save();
    res.clearCookie('token');
    res.send({message:'User logged out.'})
    
})

module.exports = app;