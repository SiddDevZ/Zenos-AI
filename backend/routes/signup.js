const express = require("express");
const userModel = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const config = require('../../config.json');


const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
});

router.post("/", async (req, res) => {
    userModel.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            res.json("alreadyexists");
            setTimeout(() => {
                userModel.findOne({ email: req.body.email })
                .then(user => {
                    if (user && !user.verified) {
                        userModel.deleteOne({ email: req.body.email })
                        .then(() => console.log("Unregistered user deleted ", user))
                        .catch(err => console.error(err));
                    }
                })
                .catch(err => console.error(err));
            }, 20000); //   3600000
        } else {
            const verificationToken = crypto.randomBytes(32).toString("hex");
            const newUser = new userModel({
                email: req.body.email,
                password: req.body.password,
                verificationToken: verificationToken,
            });
            newUser.save()
              .then(user => {
                const verificationLink = `http://localhost:3001/verify/${verificationToken}`;
    
                const mailOptions = {
                  from: 'siddz.dev@gmail.com',
                  to: user.email,
                  subject: 'Account Verification',
                  text: `Please verify your account by clicking the following link, it will expire after 1 hour:-\n\n ${verificationLink}`,
                };

                res.json("sent");
    
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.error('Error sending verification email:', error);
                    return res.status(500).json({ error: 'Error sending verification email' });
                  }
                });
              })
              .catch(err => res.status(500).json(err));
        }
    })
})


module.exports = router;