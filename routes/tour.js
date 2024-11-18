const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

router.get('/', tourController.getTours);
router.get('/:tourId', tourController.getTourById);

module.exports = router;
