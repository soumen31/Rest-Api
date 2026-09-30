const express = require('express');
const authController = require('../controllers.js/authController');
const { protect } = require('../middlewares/authMiddlewares');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/register', validateRequest(['name', 'email', 'password']), authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);
router.put('/updatedetails', protect, authController.updateDetails);
router.put('/updatepassword', protect, authController.updatePassword);

module.exports = router;
