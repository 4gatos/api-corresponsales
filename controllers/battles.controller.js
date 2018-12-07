const mongoose = require('mongoose');
const Battle = require('../models/battle.model');
const ApiError = require('../models/api-error.model');
const utils = require('../lib/utils');

module.exports.list = async (req, res, next) => {
  try {
    const result = await Battle.find();
    res.json(result);
  } catch(error) {
    next(error);
  }
}

module.exports.get = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const result = await Battle.findOne({ slug });
    if (result) {
      res.json(result);
    } else {
      next(new ApiError(`Battle not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`Battle not found`, 404));
  }
}

module.exports.create = async (req, res, next) => {
  try {
    const { name, place, date, duration } = req.body;
    const slug = utils.createSlug(name);
    const battleBody = { name, place, date, duration, slug };
    const battle = new Battle(battleBody);
    const result = await battle.save();
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
    const result = await Battle.findOneAndDelete({ slug });
    if (result) {
      res.status(204).json();
    } else {
      next(new ApiError('Battle not found', 404));
    }
  } catch(error) {
    next(error);
  }
}

module.exports.edit = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const { name, place, date, duration } = req.body;
    const battleBody = {
      ...(name && { name }),
      ...(place && { place }),
      ...(date && { date }),
      ...(duration && { duration }),
    };

    const result = await Battle.findOneAndUpdate({ slug }, { $set: battleBody }, { new: true });
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError('Battle not found', 404));
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ApiError(error.message, 400, error.errors));
    } else {
      next(new ApiError(error.message, 500));
    }
  }
}