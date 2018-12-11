const ApiError = require('../models/api-error.model');

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      next();
    } else {
      next(new ApiError('Unauthorized', 403));
    }
  } else {
    next(new ApiError('Unauthorized', 403));
  }
};