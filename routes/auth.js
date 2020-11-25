'use strict';
const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/field-validator');
const router = Router();

const { createUser, renewToken, loginUser } = require('../controllers/auth');

router.post(
	'/register',
	[
		check('name', 'Name is mandatory').not().isEmpty(),
		check('email', 'Email is mandatory').isEmail(),
		check('password', 'Password must contain 6 characters').isLength({ min: 6 }),
		validateField,
	],
	createUser
);

router.post(
	'/',
	[
		check('email', 'Email is mandatory').isEmail(),
		check('password', 'Password must contain 6 characters').isLength({ min: 6 }),
		validateField,
	],
	loginUser
);

router.get('/renew', renewToken);

module.exports = router;
