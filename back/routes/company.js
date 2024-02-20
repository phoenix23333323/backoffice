// Imports
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');

// Controller
const companyCtrl = require('../controllers/company');

// Router
router.get('/getCompany/:id', auth, companyCtrl.getCompany);
router.put('/updateCompany/:id', auth, companyCtrl.updateCompany);

module.exports = router;