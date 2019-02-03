const express = require('express');
const router = express.Router();
const battlesController = require('../controllers/battles.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', battlesController.list);
router.get('/names', battlesController.getNames);
router.get('/basic', battlesController.listBasic);
router.get('/:slug', battlesController.get);
router.post('/', secureMiddleware.isAuthenticated, battlesController.create);
router.delete('/:slug', adminMiddleware.isAdmin, battlesController.delete);
router.put('/:slug', secureMiddleware.isAuthenticated, battlesController.edit);
router.put('/:slug/approve', adminMiddleware.isAdmin, battlesController.approve);
router.put('/:slug/disapprove', adminMiddleware.isAdmin, battlesController.disapprove);

module.exports = router;