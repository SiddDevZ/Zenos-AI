const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/user");
require('dotenv').config();
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const verificationRoute = require("./routes/verify");
const responseRoute = require("./routes/response");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);

app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/verify", verificationRoute);
app.use("/response", responseRoute);


app.listen(3001, () => {
    console.log("Server is running on port 3001")
})