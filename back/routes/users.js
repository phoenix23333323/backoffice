// Imports
const express = require('express');
const router = express.Router();

// Middlewares
const limitMax = require('../middlewares/limiter');
const emailValidator = require('../middlewares/email-validator');
const passwordValidator = require('../middlewares/password-validator');

// Controller
const usersCtrl = require('../controllers/users');

// Router
router.post('/signup', emailValidator, passwordValidator, usersCtrl.signup);
router.post('/signin', limitMax.limiter, usersCtrl.signin);

module.exports = router;