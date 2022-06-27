const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv').config();

const app = express.Router() 

app.post("/", async (req, res) => {
    const {token} = req.body;
    const tokenDecoded = jwt.decode(token, process.env.privateKey);
    try{
        const user = await User.find({mail: tokenDecoded.mail});
        res.send(user[0]);
    } catch(e){
        return res.status(404).send("Invalid Token.")
    }
})

module.exports = app;