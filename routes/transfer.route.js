const express = require('express');
const router = express.Router();

const transferController = require('../controllers/transfer.controller');

router.get('/create', transferController.create);

router.post('/create', transferController.postCreate);

module.exports = router;