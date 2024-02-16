// Imports
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');

// Controller
const companyCtrl = require('../controllers/company');

// Router
//router.get('/:id', auth, companyCtrl.getById);
router.get('/:id', companyCtrl.getById);

module.exports = router;