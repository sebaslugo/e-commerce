const server = require('express').Router();
const { User } = require('../db.js');
const passport = require('passport');

server.post('/login', passport.authenticate('local', {
    successRedirect: 'https://twitter.com',
    failureRedirect: 'https://facebook.com',
    failureFlash: true
}));

server.post("/promote/:id", (req, res) => {
    const { id } = req.params;
    User.update(
        {rol: "admin"},
        {where: {id: id}}
    )
    .then(() => {
        res.status(200).json({message: "se pudo promover al usuario a admin"})
    })
    .catch(err => res.status(404).json(err))
})

module.exports  = server;