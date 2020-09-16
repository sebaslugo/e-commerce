
const server = require('express').Router();
const { User } = require('../db.js');
const passport = require('passport');

server.post('/login', passport.authenticate('local', {
    successRedirect: 'https://twitter.com',
    failureRedirect: 'https://facebook.com',
    failureFlash: true
}));

/* server.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }); */

 


module.exports  = server;

