const ApiError = require('../models/api-error.model');

module.exports.isAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new ApiError('Unauthorized', 403));
  }
};