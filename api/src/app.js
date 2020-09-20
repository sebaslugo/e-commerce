const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const initializePassport = require('./passportConfig');
const session = require('express-session');
const flash = require('express-flash');
const authentication = require('./jwt');

require('./db.js');

const server = express();

server.name = 'API';

authentication.use();

// initializePassport(passport);

server.use(session({
  // Key we want to keep secret which will encrypt all of our information
  secret: 'secret',
  // Should we resave our session variables if nothing has changes which we dont
  resave: false,
  // Save empty value if there is no vaue which we do not want to do
  saveUninitialized: true
}));

// Funtion inside passport which initializes passport
server.use(authentication.passport.initialize());
// Store our variables to be persisted across the whole session. Works with server.use(Session) above
server.use(passport.session());
server.use(flash());

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Headers", "*");
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
