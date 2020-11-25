'use strict';

const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
	const token = req.header('x-token');
	console.log(token);
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'Not valid token',
		});
	}

	try {
		const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

		req.uid = uid;
		req.name = name;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Invalid token',
		});
	}
	next();
};

module.exports = {
	validateJWT,
};