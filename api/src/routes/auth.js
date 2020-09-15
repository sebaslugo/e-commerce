const express = require("express");
const router = express.Router();

const { User } = require('../db.js');



router
    .route("/login")
    .get( (req, res) => {
        console.log(req.body)
        User.findAll()
            .then(users => {
                res.status(200).json(users)
            })
    })