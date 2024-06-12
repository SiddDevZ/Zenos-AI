const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verificationToken: { type: String, required: true },
    Token: { type: String, required: true },
    verified: { type: Boolean, default: false }
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;