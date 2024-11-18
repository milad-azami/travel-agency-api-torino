const Tour = require('../models/Tour');

exports.getTours = async (req, res) => {
	const { destinationId, originId, startDate, endDate } = req.query;


	try {
		let tours = await Tour.getAllTours();

		// Apply filters manually
		if (destinationId) {
			tours = tours.filter((tour) => tour.destination.id === destinationId);
		}

		if (originId) {
			tours = tours.filter((tour) => tour.origin.id === originId);
		}

		if (startDate) {
			const start = new Date(startDate);
			tours = tours.filter((tour) => new Date(tour.startDate) >= start);
		}
		
		if (endDate) {
			const end = new Date(endDate);
			tours = tours.filter((tour) => new Date(tour.endDate) <= end);
		}

		res.json(tours);
	} catch (err) {
		console.error('Error in getTours:', err.message);
		res.status(500).json({ message: 'خطا در دریافت تورها.' });
	}
};

exports.getTourById = async (req, res) => {
	const { tourId } = req.params;
	if (!tourId) {
		return res.status(400).json({ message: 'ID تور الزامی است.' });
	}

	try {
		const tour = await Tour.getTourById(tourId);
		if (!tour) {
			return res.status(404).json({ message: 'تور درخواستی وجود ندارد!' });
		}

		res.json(tour);
	} catch (err) {
		console.error('Error in getTourById:', err.message);
		res.status(500).json({ message: 'خطا در دریافت تور.' });
	}
};
