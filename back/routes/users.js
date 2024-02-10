// Imports
const express = require('express');
const router = express.Router();

// Controller
const usersCtrl = require('../controllers/users');

// Router
router.post('/signup', usersCtrl.signup);
router.post('/signin', usersCtrl.signin);

module.exports = router;