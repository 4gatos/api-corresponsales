const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', secureMiddleware.isAuthenticated, usersController.list);
router.post('/', adminMiddleware.isAdmin, usersController.create);
router.get('/:id', secureMiddleware.isAuthenticated, usersController.get);
router.put('/:id', adminMiddleware.isAdmin, usersController.edit);

module.exports = router;
