'use strict';

const User = require('../models/User-model');
const bcrypt = require('bcryptjs');
const createUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		console.log(user);
		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'Email already registered',
			});
		}
		user = new User(req.body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, contact with the distributor',
		});
	}
};

const loginUser = (req, res) => {
	const { email, password } = req.body;

	res.json({
		ok: true,
		msg: 'login',
		email,
		password,
	});
};

const renewToken = (req, res) => {
	res.json({
		ok: true,
		msn: 'renew',
	});
};

module.exports = {
	createUser,
	renewToken,
	loginUser,
};
