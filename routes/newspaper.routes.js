const express = require('express');
const router = express.Router();
const newspapersController = require('../controllers/newspapers.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', newspapersController.list);
router.get('/names', newspapersController.getNames);
router.get('/basic', newspapersController.listBasic);
router.get('/:slug', newspapersController.get);
router.post('/', secureMiddleware.isAuthenticated, newspapersController.create);
router.delete('/:slug', adminMiddleware.isAdmin, newspapersController.delete);
router.put('/:slug', secureMiddleware.isAuthenticated, newspapersController.edit);
router.put('/:slug/approve', adminMiddleware.isAdmin, newspapersController.approve);
router.put('/:slug/disapprove', adminMiddleware.isAdmin, newspapersController.disapprove);

module.exports = router;