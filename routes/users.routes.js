const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
// const secureMiddleware = require('../middleware/secure.middleware');

// router.get('/', secureMiddleware.isAuthenticated, usersController.list);
router.get('/', usersController.list);
router.post('/', usersController.create);
router.get('/:id', usersController.get);
router.put('/:id', usersController.edit);

module.exports = router;
