const express = require('express');
const router = express.Router();
const battlesController = require('../controllers/battles.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', secureMiddleware.isAuthenticated, battlesController.list);
router.get('/:slug', battlesController.get);
router.post('/', secureMiddleware.isAuthenticated, battlesController.create);
router.delete('/:slug', adminMiddleware.isAdmin, battlesController.delete);
router.put('/:slug', secureMiddleware.isAuthenticated, battlesController.edit);

module.exports = router;