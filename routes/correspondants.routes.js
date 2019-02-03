const express = require('express');
const router = express.Router();
const correspondantsController = require('../controllers/correspondants.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', correspondantsController.list);
router.get('/basic', correspondantsController.listBasic);
router.get('/:slug', correspondantsController.get);
router.post('/', secureMiddleware.isAuthenticated, correspondantsController.create);
router.delete('/:slug', adminMiddleware.isAdmin, correspondantsController.delete);
router.put('/:slug', secureMiddleware.isAuthenticated, correspondantsController.edit);
router.put('/:slug/approve', adminMiddleware.isAdmin, correspondantsController.approve);
router.put('/:slug/disapprove', adminMiddleware.isAdmin, correspondantsController.disapprove);

module.exports = router;