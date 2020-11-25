const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('db online');
	} catch (error) {
		console.log(error);
		throw new Error('Error with database init');
	}
};

module.exports = {
	dbConnection,
};
