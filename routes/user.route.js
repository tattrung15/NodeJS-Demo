const multer = require('multer');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const upload = multer({ dest: './public/uploads/'})

router.get('/', userController.all);

router.get('/search', userController.search);

router.get('/create', userController.create);

router.get('/:id', userController.get);

router.post('/create', upload.single('avatar'), userController.postUser);

module.exports = router;