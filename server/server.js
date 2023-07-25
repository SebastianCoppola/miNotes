//REQUIRE
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

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
app.use(cors())

//WEBSERVER ROUTES
app.use("/note",NoteRoutes)
app.use("/user",UserRoutes)
app.use("/login",LoginRoutes)
app.use("/logout",LogoutRoutes)
app.use("/decode",DecodeTokenRoutes)

// DEPLOYMENT (PRODUCTION MODE):
// const miNotes = path.resolve();
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(miNotes, "/build")));
//     app.get("*", (req, res) =>
//         res.sendFile(path.resolve(miNotes, "build", "index.html"))
//     );
// } else {
//     app.get("/", (req, res) => {
//         res.send("API is running.");
//     });
// }

//DB CONNECTION & WEBSERVER CONNECTION
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false)
mongoose.connect(process.env.atlasConnection)
.then(()=>{
    console.log("Connected to mongodb")
})
app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`)
})
