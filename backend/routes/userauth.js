const express = require("express");
const userModel = require("../models/user");
const config = require('../../env.json');


const router = express.Router();

router.post("/", async (req, res) => {
    const { token } = req.body;
    console.log(token)
    userModel.findOne({Token: token})
    .then(user => {
        if(user) {
            res.json("success")

        } else {
            res.json("notfound")
        }
    })
})


module.exports = router;