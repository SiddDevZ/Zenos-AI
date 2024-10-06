const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/user");
const config = require('../env.json');
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const verificationRoute = require("./routes/verify");
const responseRoute = require("./routes/response");
const userAuthRoute = require("./routes/userauth");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(config.MONGO_URL);

// app.use("/signup", signupRoute);
// app.use("/signin", signinRoute);
// app.use("/verify", verificationRoute);
app.use("/response", responseRoute);
// app.use("/userauth", userAuthRoute);

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})