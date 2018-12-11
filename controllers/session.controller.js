const passport = require('passport');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    next(new ApiError('Email and password are required'));
  } else {
    passport.authenticate('local-auth', (error, user, message) => {
      if (error) {
        next(error);
      } else if (!user) {
        next(new ApiError(message, 401));
      } else {
        req.login(user, (error) => {
          if (error) {
            next(new ApiError(error.message, 500));
          } else {
            res.status(201).json(req.user);
          }
        });
      }
    })(req, res, next);
  }
};

module.exports.destroy = (req, res, next) => {
  console.log('deeestroy', req.session.id);
  req.session.destroy();
  req.logout();
  res.status(204).json();
};

module.exports.isAuthenticated = (req, res, next) => {
  console.log(req.session);
  console.log('isAuthenticated', req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.status(201).json(req.user);
  } else {
    next(new ApiError('Unauthorized', 403));
  }
};