const express = require('express');
const router = express.Router();
const battlesController = require('../controllers/battles.controller');

router.get('/', battlesController.list);
router.get('/:slug', battlesController.get);
router.post('/', battlesController.create);
router.delete('/:slug', battlesController.delete);
router.put('/:slug', battlesController.edit);

module.exports = router;