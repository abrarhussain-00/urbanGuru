const express = require("express");
const cors = require("cors")
const port = 8000;
require('dotenv').config()
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
//app.use(cors())
app.use(cors({
    credentials:true,
    origiin: 'http://localhost:3000'
}))
const dotenv = require("dotenv");
dotenv.config()


app.use(express.json())
app.use(cookieParser())


require("./config/mongoose.config");
require("./routes/user.routes")(app); // may need to adjust routes here

// must be at the bottom
app.listen(port, () => console.log(`Listening on port: ${port}`))