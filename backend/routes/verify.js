const express = require("express");
const userModel = require("../models/user");
const config = require('../../env.json');
const config2 = require('../../config.json');

const router = express.Router();

router.get("/:token", async (req, res) => {
  const token = req.params.token;

  try {
    const user = await userModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    user.verified = true;
    await user.save();

    // res.status(200).json({ message: "Account verified successfully" });
    
    res.redirect(`urlhere/sign-in?verified=true`);

  } catch (error) {
    console.error("Error verifying account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;