const mongoose = require('mongoose');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id

  User.findById(id)
    .then( user => {
      if (user) {
        res.json(user);
      } else {
        next(new ApiError(`User not found`, 404));
      }
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const { email, password, name, surname, phone, admin } = req.body;
  if (req.user.role === 'admin') {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          next(new ApiError('User already registered', 400));
        } else {
          user = new User({
            email, password, name, surname, phone, ...(admin ? { role: 'admin' } : null)
          });
          user.save()
            .then(() => {
              res.json(user);
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(new ApiError(error.message, 400, error.errors));
              } else {
                next(error);
              }
            });
        }
      }).catch(error => next(new ApiError('User already registered', 500)));
  } else {
    next(new ApiError('Unauthorized', 403));
  }
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  const { name, surname, phone, admin } = req.body;
  let updates = {
    name,
    surname,
    phone,
    ...(admin ? { role: 'admin' } : { role: 'user' })
  }

  User.findByIdAndUpdate(id, { $set: updates }, { new: true })
    .then( user => {
      if (user) {
        res.status(201).json(user)
      } else {
        next(new ApiError(`User not found`, 404));
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  if (req.user.role === 'admin') {
    User.findByIdAndDelete(id)
      .then(user => {
        if (user) {
          res.status(204).json();
        } else {
          next(new ApiError('User not found', 404));
        }
      })
  } else {
    next(new ApiError('Unauthorized', 403));
  }
}