'use strict';

const { Router } = require('express');

const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/field-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post(
	'/',
	[
		check('title', 'Title is mandatory').not().isEmpty(),

		check('start', 'Start date is mandatory').custom(isDate),

		check('end', 'End date is mandatory').custom(isDate),
		validateField,
	],

	createEvent
);

router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
