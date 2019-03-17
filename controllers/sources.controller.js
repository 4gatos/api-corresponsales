const mongoose = require('mongoose');
const Source = require('../models/source.model');
const ApiError = require('../models/api-error.model');
const utils = require('../lib/utils');
const Mailer = require('../models/email.model');

const basicProyection = {
  __v: false,
  _id: false,
  createdAt: false,
  updatedAt: false,
};

module.exports.list = async (req, res, next) => {
  try {
    const result = await Source.find({}, basicProyection);
    res.json(result);
  } catch(error) {
    next(error);
  }
}

module.exports.getNames = async (req, res, next) => {
  try {
    const result = await Source.find({}, 'id name');
    res.json(result);
  } catch(error) {
    next(error);
  }
}

module.exports.listBasic = async (req, res, next) => {
  try {
    const result = await Source.find({ approved: true }, 'id name mainImg slug description geographicLng geographicLat')
    res.json(result);
  } catch(error) {
    next(error);
  }
}

module.exports.get = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const result = await Source.findOne({ slug }, basicProyection);
    if (result) {
      res.json(result);
    } else {
      next(new ApiError(`Source not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`Source not found`, 404));
  }
}

module.exports.approve = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const result = await Source.findOneAndUpdate({ slug }, { $set: { approved: true } }, { new: true })
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError(`Source not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`Source not found`, 404));
  }
}

module.exports.disapprove = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const result = await Source.findOneAndUpdate({ slug }, { $set: { approved: false } }, { new: true })
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError(`Source not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`Source not found`, 404));
  }
}

module.exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = utils.createSlug(name);
    const sourceBody = {
      ...req.body,
      ...(req.user.role === 'admin' ? { approved: true } : { approved: false }),
      slug
    }
    const source = new Source(sourceBody);
    const result = await source.save();
    const mail = new Mailer();
    const message = {
      from: 'Admin <sender@server.com>',
      to: process.env.MAILTO || 'plasocortabitarte@gmail.com',
      subject: 'Nueva fuente',
      text: `Se ha añadido una nueva fuente con el nombre de ${source.name}`
  };
    mail.sendNewMail(message);
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
    const result = await Source.findOneAndDelete({ slug });
    if (result) {
      res.status(204).json();
    } else {
      next(new ApiError('Source not found', 404));
    }
  } catch(error) {
    next(error);
  }
}

module.exports.edit = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const result = await Source.findOneAndUpdate({ slug }, { $set: req.body }, { new: true });
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError('Source not found', 404));
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ApiError(error.message, 400, error.errors));
    } else {
      next(new ApiError(error.message, 500));
    }
  }
}