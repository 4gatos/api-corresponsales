const mongoose = require('mongoose');
const GroupSources = require('../models/groupSources.model');
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
    const result = await GroupSources.find({}, basicProyection).populate('sources');
    res.json(result);
  } catch(error) {
    next(error);
  }
}

module.exports.get = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const result = await GroupSources.findOne({ slug }, basicProyection).populate('sources');
    if (result) {
      res.json(result);
    } else {
      next(new ApiError(`GroupSources not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`GroupSources not found`, 404));
  }
}

module.exports.approve = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const result = await GroupSources.findOneAndUpdate({ slug }, { $set: { approved: true } }, { new: true })
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError(`GroupSources not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`GroupSources not found`, 404));
  }
}

module.exports.disapprove = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const result = await GroupSources.findOneAndUpdate({ slug }, { $set: { approved: false } }, { new: true })
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError(`GroupSources not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`GroupSources not found`, 404));
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
    const source = new GroupSources(sourceBody);
    const result = await source.save();
    const mail = new Mailer();
    const message = {
      from: 'Admin <sender@server.com>',
      to: process.env.MAILTO || 'plasocortabitarte@gmail.com',
      subject: 'Nueva fuente',
      text: `Se ha añadido un nuevo grupo de fuentes con el nombre de ${source.name}`
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
    const result = await GroupSources.findOneAndDelete({ slug });
    if (result) {
      res.status(204).json();
    } else {
      next(new ApiError('Newspaper not found', 404));
    }
  } catch(error) {
    next(error);
  }
}

module.exports.edit = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const result = await GroupSources.findOneAndUpdate({ slug }, { $set: req.body }, { new: true });
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError('GroupSources not found', 404));
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ApiError(error.message, 400, error.errors));
    } else {
      next(new ApiError(error.message, 500));
    }
  }
}

