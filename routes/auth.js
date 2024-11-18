const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/send-otp', authController.sendOtp);
router.post('/check-otp', authController.checkOtp);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
