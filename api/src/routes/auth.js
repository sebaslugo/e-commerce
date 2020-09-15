const server = require('express').Router();
const { User } = require('../db.js');
const passport = require('passport');

server.post('/login', passport.authenticate('local', {
    successRedirect: 'https://twitter.com',
    failureRedirect: 'https://facebook.com',
    failureFlash: true
}));

server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://google.com');
});

module.exports = server;