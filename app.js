const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const corsConfig = require('./configs/cors.config');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
require('./configs/db.config');
require('./configs/passport.config').setup(passport);

const usersRoutes = require('./routes/users.routes');
const sessionRoutes = require('./routes/session.routes');
const battlesRoutes = require('./routes/battles.routes');
const correspondantsRoutes = require('./routes/correspondants.routes');

const app = express();

app.use(cors(corsConfig));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.COOKIE_SECRET || 'Super Secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.user || {};
  next();
});

app.use('/users', usersRoutes);
app.use('/session', sessionRoutes);
app.use('/battles', battlesRoutes);
app.use('/correspondants', correspondantsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next)  => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message || '' });
});

module.exports = app;
