const mongoose = require('mongoose');
const Correspondant = require('../models/correspondant.model');
const ApiError = require('../models/api-error.model');
const utils = require('../lib/utils');

const basicProyection = {
  __v: false,
  _id: false,
  createdAt: false,
  updatedAt: false,
};

module.exports.list = async (req, res, next) => {
  try {
    const result = await Correspondant.find({}, basicProyection);
    res.json(result);
  } catch(error) {
    next(error);
  }
}

module.exports.get = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const result = await Correspondant.findOne({ slug }, basicProyection);
    if (result) {
      res.json(result);
    } else {
      next(new ApiError(`Correspondant not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`Correspondant not found`, 404));
  }
}

module.exports.create = async (req, res, next) => {
  try {
    const { name, country, date, newspaper, battle } = req.body;
    const slug = utils.createSlug(name);
    const correspondantBody = { name, country, date, newspaper, slug, battle };
    const correspondant = new Correspondant(correspondantBody);
    const result = await correspondant.save();
    res.status(201).json(result);
  } catch(error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ApiError(error.errors));
    } else {
      next(new ApiError(error.message, 500));
    }
  }
}

module.exports.delete = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const result = await Correspondant.findOneAndDelete({ slug });
    if (result) {
      res.status(204).json();
    } else {
      next(new ApiError('Correspondant not found', 404));
    }
  } catch(error) {
    next(error);
  }
}

module.exports.edit = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const { name, country, date, newspaper, battle } = req.body;
    const correspondantBody = {
      ...(name && { name }),
      ...(country && { country }),
      ...(date && { date }),
      ...(newspaper && { newspaper }),
      ...(battle && { battle }),
    };

    const result = await Correspondant.findOneAndUpdate({ slug }, { $set: correspondantBody }, { new: true });
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError('Correspondant not found', 404));
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ApiError(error.message, 400, error.errors));
    } else {
      next(new ApiError(error.message, 500));
    }
  }
}