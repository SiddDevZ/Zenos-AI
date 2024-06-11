const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/user");
const config = require('../config.json');
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const verificationRoute = require("./routes/verify");


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(config.mongoUrl);

app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/verify", verificationRoute);


app.listen(3001, () => {
    console.log("Server is running on port 3001")
})