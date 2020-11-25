'use strict';

const User = require('../models/User-model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const createUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'User or email already registered',
			});
		}
		user = new User(req.body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, contact with the distributor',
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'Invalid user or email',
			});
		}

		const validatePassword = bcrypt.compareSync(password, user.password);

		if (!validatePassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Invalid password',
			});
		}
		const token = await generateJWT(user.id, user.name);

		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, contact with the distributor',
		});
	}
};

const renewToken = async (req, res) => {
	const { uid, name } = req;
	const token = await generateJWT(uid, name);

	res.json({
		ok: true,
		token,
	});
};

module.exports = {
	createUser,
	renewToken,
	loginUser,
};
