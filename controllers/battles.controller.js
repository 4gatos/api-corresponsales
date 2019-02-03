const mongoose = require('mongoose');
const Battle = require('../models/battle.model');
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
    const result = await Battle.find({}, basicProyection);
    res.json(result);
  } catch(error) {
    next(error);
  }
}

module.exports.getNames = async (req, res, next) => {
  try {
    const result = await Battle.find({}, 'id name');
    res.json(result);
  } catch(error) {
    next(error);
  }
}

module.exports.listBasic = async (req, res, next) => {
  try {
    const result = await Battle.find({}, 'id name mainImg slug history geographicLng geographicLat')
    res.json(result);
  } catch(error) {
    next(error);
  }
}

module.exports.get = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const result = await Battle.findOne({ slug }, basicProyection);
    if (result) {
      res.json(result);
    } else {
      next(new ApiError(`Battle not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`Battle not found`, 404));
  }
}

module.exports.approve = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const result = await Battle.findOneAndUpdate({ slug }, { $set: { approved: true } }, { new: true })
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError(`Battle not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`Battle not found`, 404));
  }
}

module.exports.disapprove = async (req, res, next) => {
  console.log('prueba');
  const { slug } = req.params;
  try {
    const result = await Battle.findOneAndUpdate({ slug }, { $set: { approved: false } }, { new: true })
    if (result) {
      res.status(201).json(result);
    } else {
      next(new ApiError(`Battle not found`, 404));
    }
  } catch(error) {
    next(new ApiError(`Battle not found`, 404));
  }
}

module.exports.create = async (req, res, next) => {
  try {
    const { name, place, date, duration, mainImg, history, geographicLng, geographicLat, geographicDescription, importantPeople } = req.body;
    const slug = utils.createSlug(name);
    const battleBody = {
      name,
      place,
      date,
      duration,
      mainImg,
      slug,
      history,
      geographicLng,
      geographicLat,
      geographicDescription,
      importantPeople,
      ...(req.user.role === 'admin' ? { approved: true } : { approved: false })
    };
    const battle = new Battle(battleBody);
    const result = await battle.save();
    const mail = new Mailer();
    const message = {
      from: 'Admin <sender@server.com>',
      to: 'plasocortabitarte@gmail.com',
      subject: 'Nuevo hito',
      text: `Se ha añadido un nuevo hito con el nombre de ${battle.name}`
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
    const { name, place, date, duration, mainImg, history, geographicLng, geographicLat, geographicDescription, importantPeople } = req.body;
    const battleBody = {
      ...(name && { name }),
      ...(place && { place }),
      ...(date && { date }),
      ...(duration && { duration }),
      ...(mainImg && { mainImg }),
      ...(history && { history }),
      ...(geographicDescription && { geographicDescription }),
      ...(geographicLng && { geographicLng }),
      ...(geographicLat && { geographicLat }),
      ...(importantPeople && { importantPeople })
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