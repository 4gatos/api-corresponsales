const express = require('express');
const router = express.Router();
const groupSourcesController = require('../controllers/groupSources.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', groupSourcesController.list);
router.get('/:slug', groupSourcesController.get);
router.post('/', secureMiddleware.isAuthenticated, groupSourcesController.create);
router.delete('/:slug', adminMiddleware.isAdmin, groupSourcesController.delete);
router.put('/:slug', secureMiddleware.isAuthenticated, groupSourcesController.edit);
router.put('/:slug/approve', adminMiddleware.isAdmin, groupSourcesController.approve);
router.put('/:slug/disapprove', adminMiddleware.isAdmin, groupSourcesController.disapprove);

module.exports = router;