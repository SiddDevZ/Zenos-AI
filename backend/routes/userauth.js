const express = require("express");
const userModel = require("../models/user");
const config = require('../../env.json');


const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { token } = req.body;
        
        const user = await userModel.findOne({ Token: token });

        if (user) {
            res.json("success");
        } else {
            res.json("notfound");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json("error");
    }
});

module.exports = router;