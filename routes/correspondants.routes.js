const express = require('express');
const router = express.Router();
const correspondantsController = require('../controllers/correspondants.controller');

router.get('/', correspondantsController.list);
router.get('/:slug', correspondantsController.get);
router.post('/', correspondantsController.create);
router.delete('/:slug', correspondantsController.delete);
router.put('/:slug', correspondantsController.edit);

module.exports = router;