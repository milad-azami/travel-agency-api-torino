const express = require('express');
const { writeData, readData } = require('../utils/fileHandler');
const router = express.Router();

const ORDERS_FILE = 'Order.json';
const TOURS_FILE = 'Tours/index.json';
const TOURS_INIT_FILE = 'Tours/init.json';
const TRANSACTIONS_FILE = 'Transaction.json';
const USERS_FILE = 'User.json';
const Basket_FILE = 'Basket.json';

router.get('/truncate', async (req, res, next) => {
	const tourInitData = await readData(TOURS_INIT_FILE);
	await Promise.all([
		writeData(ORDERS_FILE, []),
		writeData(TOURS_FILE, tourInitData),
		writeData(TRANSACTIONS_FILE, []),
		writeData(USERS_FILE, []),
		writeData(Basket_FILE, {}),
	]);
	res.status(200).json({
		message: 'database truncated',
	});
});

module.exports = router;
