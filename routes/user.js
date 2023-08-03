const path = require('path');

const express = require('express');

const userController = require('../controllers/user.js');

const router = express.Router();

router.get('/create-user', userController.getUserCreate);

router.post('/create-user', userController.postUserCreate);

module.exports = router;