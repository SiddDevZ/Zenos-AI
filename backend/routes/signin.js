const express = require("express");
const userModel = require("../models/user");
const config = require('../../config.json');


const router = express.Router();

router.post("/", async (req, res) => {
    const {email, password} = req.body;
    userModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("success")
            } else {
                res.json("Password is incorrect")
            }
        } else {
            res.json("User not found")
        }
    })
})


module.exports = router;