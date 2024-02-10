// Imports
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');
// const multer = require('../middlewares/multer-config');

// Controller
const companyCtrl = require('../controllers/company');

// Router
router.get('/', auth, companyCtrl.getAll);
// router.get('/byUser', auth, postCtrl.getAllUserPost)
// router.post('/', auth, multer, postCtrl.createPost)
// router.put('/:id', auth, multer, postCtrl.modifyPost)
// router.delete('/:id', auth, postCtrl.deletePost)
// router.get('/like', auth, postCtrl.getLikedPost)
// router.post('/:id/like', auth, postCtrl.likePost)

module.exports = router;