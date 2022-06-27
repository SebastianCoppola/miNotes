const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

function isAuth (req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send("Please login to accsess.")
    }
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token, process.env.privateKey);
    try{
        User.find({mail: tokenDecoded.mail}, () => {
            next();
        })
    } catch(e){
        return res.status(404).send("Invalid Token.")
    }
}

module.exports = isAuth;