const Basket = require('../models/Basket');
const Tour = require('../models/Tour');

exports.getBasket = async (req, res) => {

	try {
		let basket = await Basket.getFromBasket();

		// Apply filters manually
		if (!basket?.id) {
			return res.status(404).json({message:"سبد خرید شما خالی است"})
		}



		res.status(200).json(basket);
	} catch (err) {
		console.error('Error in getting basket:', err.message);
		res.status(500).json({ message: 'خطا در دریافت سبد خرید.' });
	}
};

exports.addToBasket = async (req, res) => {
	const { tourId } = req.params;
	if (!tourId) {
		return res.status(400).json({ message: 'ID تور الزامی است.' });
	}

	try {
		const tour = await Tour.getTourById(tourId);
		if (!tour) {
			return res.status(404).json({ message: 'تور درخواستی وجود ندارد!' });
		}
    
    Basket.addToBasket(tour)

		res.status(201).json({
      message: `تور ${tour.title} به سبد خرید شما افزوده شد.`
    });
	} catch (err) {
		console.error('Error in addToBasket:', err.message);
		res.status(500).json({ message: 'افزودن تور به سبد خرید' });
	}
};
