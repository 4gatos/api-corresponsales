const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const corsConfig = require('./configs/cors.config');

require('dotenv').config();
require('./configs/db.config');

const usersRoutes = require('./routes/users.routes');
const battlesRoutes = require('./routes/battles.routes');
const correspondantsRoutes = require('./routes/correspondants.routes');

const app = express();

app.use(cors(corsConfig));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRoutes);
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
