const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/user");
const nodemailer = require('nodemailer');

const app = express()
app.use(express.json())
app.use(cors())


app.post("/signup", (req, res) => {
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
            }, 20000); // 1 hour in milliseconds    3600000
        } else {
            const newUser = new userModel(req.body);
            newUser.save()
              .then(user => {
                const verificationLink = `http://your-domain.com/verify/${user._id}`;
    
                const mailOptions = {
                  from: 'siddz.dev@gmail.com',
                  to: user.email,
                  subject: 'Account Verification',
                  text: `Please verify your account by clicking the following link: ${verificationLink}`,
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

app.post("/signin", (req, res) => {
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

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})