const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middlewares/authMiddleware');


router.use(authMiddleware); // Apply authentication middleware
router.put('/:tourId', basketController.addToBasket);
router.get('/', basketController.getBasket);

module.exports = router;
