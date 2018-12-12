const mongoose = require('mongoose');
const Correspondant = require('../models/correspondant.model');
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
    const { name, country, date, mainImg, backgroundImg, documentationImg, newspaper, historicDetails, geographicDescription, coordinates, documentation, documentationLinks, battle } = req.body;
    const slug = utils.createSlug(name);
    const correspondantBody = {
      name,
      country,
      date,
      newspaper,
      geographicDescription,
      historicDetails,
      coordinates,
      mainImg,
      backgroundImg,
      documentation,
      ...(coordinates && { coordinates }),
      ...(documentationImg && { documentationImg }),
      ...(documentationLinks && { documentationLinks }),
      slug,
      ...(battle && { battle }),
    };
    const correspondant = new Correspondant(correspondantBody);
    const result = await correspondant.save();
    const mail = new Mailer();
    const message = {
      from: 'Admin <sender@server.com>',
      to: 'plasocortabitarte@gmail.com',
      subject: 'Nuevo corresponsal',
      text: `Se ha añadido un nuevo corresponsal`
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
    const { name, country, date, mainImg, backgroundImg, documentationImg, newspaper, battle, historicDetails, coordinates, documentation, documentationLinks, geographicDescription } = req.body;
    console.log('coordinates', coordinates);
    const correspondantBody = {
      ...(name && { name }),
      ...(country && { country }),
      ...(date && { date }),
      ...(mainImg && { mainImg }),
      ...(backgroundImg && { backgroundImg }),
      ...(newspaper && { newspaper }),
      ...(historicDetails && { historicDetails }),
      ...(coordinates && { coordinates }),
      ...(documentation && { documentation }),
      ...(documentationImg && { documentationImg }),
      ...(documentationLinks && { documentationLinks }),
      ...(geographicDescription && { geographicDescription }),
      ...(battle && { battle })
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