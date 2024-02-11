// Imports
const express = require('express');
const router = express.Router();

// Middlewares
const limitMax = require('../middlewares/limiter');

// Controller
const usersCtrl = require('../controllers/users');

// Router
router.post('/signup', usersCtrl.signup);
router.post('/signin', limitMax.limiter, usersCtrl.signin);

module.exports = router;