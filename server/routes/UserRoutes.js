const express = require('express');
const { getAllUsers, getUser, signUp, editUser, deleteUser } = require('../controllers/UserController');
const Auth = require('../middlewares/Auth');

const app = express.Router() 

app.get("/all",getAllUsers)

app.get("/:id",getUser)

app.post("/",signUp)

app.put("/",Auth,editUser)

app.delete("/",Auth,deleteUser)

module.exports = app;