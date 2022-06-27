//REQUIRE
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

//ROUTES
const UserRoutes = require('./routes/UserRoutes');
const LoginRoutes = require('./routes/LoginRoutes');
const LogoutRoutes = require('./routes/LogoutRoutes');
const NoteRoutes = require('./routes/NoteRoutes');
const DecodeTokenRoutes = require('./routes/DecodeTokenRoutes');

const app = express()

//WEBSERVER CONFIG
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//WEBSERVER ROUTES
app.get("/", (req,res) => {
    res.sendFile("public/index.html", {root: "."})
})
app.use("/note",NoteRoutes)
app.use("/user",UserRoutes)
app.use("/login",LoginRoutes)
app.use("/logout",LogoutRoutes)
app.use("/decode",DecodeTokenRoutes)

//DB CONNECTION & WEBSERVER CONNECTION
mongoose.connect("mongodb://localhost:27017/minotes")
.then(()=>{
    console.log("Connected to mongodb")
})
app.listen(3001,()=>{
    console.log(`Server is running on port 3001`)
})
