const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // Apply authentication middleware

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/tours', userController.getUserTours);
router.get('/transactions', userController.getUserTransactions);

module.exports = router;
