const express = require("express");
const userModel = require("../models/user");
require('dotenv').config();


const router = express.Router();

router.post("/", async (req, res) => {
    const {email, password} = req.body;
    userModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("success")
            } else {
                res.json("incorrect")
            }
        } else {
            res.json("notfound")
        }
    })
})


module.exports = router;