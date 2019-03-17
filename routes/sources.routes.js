const express = require('express');
const router = express.Router();
const sourcesController = require('../controllers/sources.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', sourcesController.list);
router.get('/names', sourcesController.getNames);
router.get('/basic', sourcesController.listBasic);
router.get('/:slug', sourcesController.get);
router.post('/', secureMiddleware.isAuthenticated, sourcesController.create);
router.delete('/:slug', adminMiddleware.isAdmin, sourcesController.delete);
router.put('/:slug', secureMiddleware.isAuthenticated, sourcesController.edit);
router.put('/:slug/approve', adminMiddleware.isAdmin, sourcesController.approve);
router.put('/:slug/disapprove', adminMiddleware.isAdmin, sourcesController.disapprove);

module.exports = router;