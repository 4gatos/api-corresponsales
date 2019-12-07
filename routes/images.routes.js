const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.delete('/', secureMiddleware.isAuthenticated, imagesController.deleteImage)

module.exports = router